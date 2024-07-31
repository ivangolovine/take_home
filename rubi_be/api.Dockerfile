# see: https://github.com/LukeMathWalker/cargo-chef

# ----- base image

FROM rust:latest AS chef 
RUN cargo install cargo-chef 


# ----- chef prepare image

FROM chef AS prepare_image

WORKDIR /repo

COPY ./Cargo.toml /repo/Cargo.toml
COPY ./Cargo.lock /repo/Cargo.lock
COPY ./crates /repo/crates/

RUN cargo chef prepare --recipe-path recipe.json


# ----- chef build image

FROM chef AS build_image

WORKDIR /repo

COPY --from=prepare_image /repo/recipe.json /repo/recipe.json
RUN cargo chef cook --release --recipe-path recipe.json

COPY ./Cargo.toml /repo/Cargo.toml
COPY ./Cargo.lock /repo/Cargo.lock
COPY ./crates /repo/crates/
RUN cargo build --release --bin api


# ----- running image

FROM debian:latest

RUN set -eux; \
	apt-get update; \
	apt-get install -y --no-install-recommends \
		ca-certificates \
        openssl \
	; \
	rm -rf /var/lib/apt/lists/*

COPY --from=build_image /repo/target/release/api /bin/api
CMD ["/bin/api"]

