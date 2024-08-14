## Overview

### Identifying Gaps
- The way the template page is currently set up is not very customizable to user-specific needs, especially when working with different police agencies.
- A user will struggle to find specific templates when the list grows too large.
- There is no proper access control implemented, which would prevent someone from accessing the tools they should not have access to.


### Solutions and Implementation

#### 1
#### Solution
- Add a setting page that gives the user the ability to customize the theme, add a greater variety of sections, and pick the location of the template and email section not being restricted to a dedicated page and accessible across the system if that option is selected. 

#### Purpose
- The system can now be used by different agencies and has unique features and themes reducing the amount of custom-written code.

#### Potential Impact
- The implementation is now more appealing for different agencies, and upkeep cost is reduced due to the reusable nature of the way it's written.

#### Integration
- Separating the components that make up UI, and adding a settings section which can target specific components for theming with user input or a predefined selection of themes, or components. This can then be saved in the backend for that specific user or agency, and applied when that specific user logs in.

#### 2
#### Solution
- Implement search functionality which allows the user to search up specific templates, and also let the user group the templates into lists for easier access.

#### Purpose
- The user experience will be improved, the number of templates can now be much greater, and the time spent searching for a particular template is reduced significantly.

#### Potential Impact
- The template feature can now play a greater role and be more expansive instead of only being used for the most frequently used templates.

#### Integration
- A search bar can be added inside the template component, and this allows the user to match the titles of the templates with a query that searches through all the templates creating a list that has anything that matches. A group tab can be created which stores all the user-created groups and allows the user to add a new template to the specified group, when the user selects the specified group it loads all the templates saved inside this group.  

#### 3
#### Solution
- Add role-base access control to the system.

#### Purpose
- Allows the agency to group specific users, and allows only qualified personal the ability to perform sensitive tasks.

#### Potential Impact
- Heightens the security of the system, reduces the chances for potential bad actors accessing parts of the systems, and allows the agency to meet the necessary legal requirements.

#### Integration
- Creating administrator settings that let the agency create specific roles and groups. Implementing authentication and autherization so that certain parts of the website and features are not accessible.

#### Scalability and Flexibility

#### 1
- Having customizable themes and components reduces the amount of custom work being done on the development side. This makes the website more flexible when it comes to catering to the different needs of various agencies.

#### 2
- Improving the user experience with search capabilities makes the template feature more appealing and scalable when agencies require a larger variety of templates.

#### 3
- Role-based access control allows the agencies to configure the security features to their liking without the need for developer intervention.


### Instructions For Running The Project

#### Clone the repository

- It should be the same as the currently provided instructions I just changed from rust to flask for my backend

1:
- Clone the repository.

git clone https://github.com/ivangolovine/take_home.git


2: 
- Start the docker.

 docker compose up -w --build 


 3:
- Go to the localhost.
http://localhost:8080/list


4:
- From the top left drop down menu select Template List.


5:
- Click the Template button inside the blue rectangle bottom left.

6:
- Click on any template to have the title subject line and message be inserted into the input blue email fields.
- Use The Template button to add a new template, by clicking save it saves it and cancel exists out into the rest of the templates.
- The X will close the template side bar and so will clicking the templates button inside the blue rectangle container
- Clicking on the garbage icon inside the blue container clears it.
- Clicking on the template garbage icon deletes the specific template.
- Clicking the edit icon next to the garbage icon opens up the the editing option on the template, for edit to take effect click save.
- The templates will be saved in a templates.json file in the backend.

7:
- Exit using ctrl c


