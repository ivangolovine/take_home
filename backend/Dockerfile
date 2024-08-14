FROM python:3.11.3

# Set the working directory in the container to /backend
WORKDIR /backend

# Copy the backend directory contents into the container at /backend
COPY . /backend

# Move to the src directory where main.py is located
WORKDIR /backend/src

# Create a virtual environment
RUN python -m venv /backend/venv

# Activate the virtual environment and install dependencies
RUN /bin/bash -c "source /backend/venv/bin/activate && pip install --no-cache-dir -r /backend/requirements.txt"

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Set environment variables to ensure the virtual environment is used
ENV VIRTUAL_ENV=/backend/venv
ENV PATH="/backend/venv/bin:$PATH"

# Run Flask using the virtual environment
CMD ["/bin/bash", "-c", "source /backend/venv/bin/activate && python main.py"]
