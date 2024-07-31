use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
    Json, Router,
};

/// This mod emulates the entire database.
/// No changes should be made to any code in this mod.
///
/// The database is created in the application state using your custom template struct.
#[allow(dead_code)]
mod db {
    /// An error that resulted from an action on the database
    #[derive(Debug, Clone, thiserror::Error)]
    pub enum DatabaseError {
        /// There was a problem writing to the database
        #[error("There was a problem writing to the database")]
        WriteError,
        /// There was a problem reading from the database
        #[error("There was a problem reading from the database")]
        ReadError,
    }

    /// The result type of an action on the database
    pub type DatabaseResult<T> = Result<T, DatabaseError>;

    /// A database of templates.
    ///
    /// Provided is a constructor: `new`, CRUD operations, `count_templates`, and `select_templates`.
    /// `select_templates` is the many version of `read_template` and you can provide a `filter` predicate which
    /// should be treated as the equivalent of a SQL SELECT.
    #[derive(Clone)]
    pub struct Database<T> {
        templates: std::sync::Arc<std::sync::RwLock<std::collections::HashMap<i32, T>>>,
    }

    impl<T> Database<T>
    where
        T: Clone,
    {
        /// Initialize a database
        pub fn new() -> Self {
            Self {
                templates: Default::default(),
            }
        }

        /// Add a new template to the database. If there is a preexisting template with `id` then it will be overwritten.
        ///
        /// This will fail when the database can not be written.
        pub fn create_template(&self, id: i32, template: T) -> DatabaseResult<()> {
            let mut map = self
                .templates
                .write()
                .map_err(|_| DatabaseError::WriteError)?;
            map.insert(id, template);
            Ok(())
        }

        /// Get a template from the database.
        ///
        /// This will fail when the database can not be read.
        pub fn read_template(&self, id: i32) -> DatabaseResult<Option<T>> {
            let map = self
                .templates
                .read()
                .map_err(|_| DatabaseError::ReadError)?;

            let template = map.get(&id).cloned();
            Ok(template)
        }

        /// Update a template in the database. If there is no preexisting template with `id` then this action will act like `create_template`.
        ///
        /// This will fail when the database can not be written.
        pub fn update_template(&self, id: i32, template: T) -> DatabaseResult<()> {
            let mut map = self
                .templates
                .write()
                .map_err(|_| DatabaseError::WriteError)?;
            if let Some(existing_template) = map.get_mut(&id) {
                *existing_template = template;
            } else {
                map.insert(id, template);
            }
            Ok(())
        }

        /// Remove a template in the database. If there is no preexisting template with `id` then this action will do nothing.
        ///
        /// This will fail when the database can not be written.
        pub fn delete_template(&self, id: i32) -> DatabaseResult<()> {
            let mut map = self
                .templates
                .write()
                .map_err(|_| DatabaseError::WriteError)?;
            map.remove(&id);
            Ok(())
        }

        /// Count the templates in the database. This is used in the example handler and likely is not needed otherwise.
        /// If you need to count a selection call `select_templates` and call `len` on the result.
        ///
        /// This will fail when the database can not be read.
        pub fn count_templates(&self) -> DatabaseResult<usize> {
            let map = self
                .templates
                .read()
                .map_err(|_| DatabaseError::ReadError)?;
            let count = map.len();
            Ok(count)
        }

        /// Select templates from the database that match the predicate `filter` and return them in a Vec.
        ///
        /// This will fail when the database can not be read.
        pub fn select_templates<F>(&self, mut filter: F) -> DatabaseResult<Vec<T>>
        where
            F: FnMut(&T) -> bool,
        {
            let map = self
                .templates
                .read()
                .map_err(|_| DatabaseError::ReadError)?;
            let mut selection = Vec::new();
            for template in map.values() {
                if filter(template) {
                    selection.push(template.clone());
                }
            }
            Ok(selection)
        }
    }
}

/// This is your template type. It is the type the database stores.
/// Modify this any way.
#[derive(Debug, Clone)]
struct Template {
    // ...
}

#[tokio::main]
async fn main() {
    // create the database, you do not need to change this
    let database = db::Database::<Template>::new();
    let app = Router::new()
        // add the example route to the router
        .route("/count_templates", get(example_handler_count_templates))
        // add the database state to the app.
        // see how the database is retreived (extracted) in the example handler parameters
        .with_state(database);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

/// The return type of the following example handler.
#[derive(Debug, Clone, serde::Serialize)]
struct ExampleHandlerCountTemplatesResponse {
    count: usize,
}

/// Example handler that will count all the templates in the database and return it as json.
async fn example_handler_count_templates(
    State(db): State<db::Database<Template>>,
) -> Result<Json<ExampleHandlerCountTemplatesResponse>, AppError> {
    // get the count from the database
    let count = db.count_templates()?;
    // construct the response struct
    let response = ExampleHandlerCountTemplatesResponse { count };
    // convert the response struct into a Json and return it
    Ok(response.into())
}

// Make our own error that wraps `anyhow::Error`.
struct AppError(anyhow::Error);

// Tell axum how to convert `AppError` into a response.
impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Something went wrong: {}", self.0),
        )
            .into_response()
    }
}

// This enables using `?` on functions that return `Result<_, anyhow::Error>` to turn them into
// `Result<_, AppError>`. That way you don't need to do that manually.
impl<E> From<E> for AppError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}
