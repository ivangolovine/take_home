# Rubicon Email Templates Management

Welcome to the Rubicon Email Templates Management take-home project! As a Full-Stack Developer on the Rubicon team, your task is to develop a new customer feature from end to end for our online non-emergency reporting system. This system accepts crime reports from citizens, and officers then process the reports and respond back to the citizen with instructions for next steps (if any).

## Project Overview

Officers from Barrie Police Service have asked for a way to manage and use email templates when responding to online report submissions. They said that current responses “are often very similar each time and can be lengthy.” They want a way to streamline the response process, saving time and ensuring consistency.

## Technical Implementation Section

Implement the following functionality to support this feature:

### Email Templates Management

#### Template List

- Create a page to display a list of current templates stored in the database.
- Allow users to edit and delete existing templates.

#### Template Creation

- Provide a form to create new templates.
- The editing interface for creating or modifying a template can be on the same page or a different page, based on your preference.

#### Report Response

- **Template Loading:** Load the list of templates from the database via a network call. Note: Reading from a local cache or state variable defeats the purpose of the exercise.
- **Display Templates:** Display the list of templates for users to select from.
- **Template Application:** Populate a text box with the selected template's contents. Allow users to complete and personalize their message.

### Bonus Extensions

- Implement support for rich-text templates using Markdown or HTML.

## Technology Stack

You will need to create pages, routes, network endpoints, and data models to complete this task. On the back-end, you can use an in-memory data store if not connecting to a formal database helps reduce complexity.

We have provided a base project in React and Rust to reduce some of the admin overhead. The front-end must be in React, but the back-end can use another framework. We use Rust in-house and all team members will learn to work with it, but recognize learning this for the take-home task is likely out of scope. Choose what you can shine in!

## Product Mapping Section

### Overview

This section assesses your ability to foresee future requirements and scalability needs based on user feedback or potential expansion to more agencies.

### Objectives

#### Identifying Gaps

- Reflect on unaddressed user and/or Rubicon scaling needs beyond the minimum requirements.

#### Solutions and Implementation

- For each gap, propose a solution, its purpose, and potential impact. Briefly discuss its integration within the current codebase. NO CODING required.

#### Scalability and Flexibility

- Considering that other police services might adopt a similar system, describe how your solution can be scalable to cater to slight variations.

### Instructions

- Identify at least three user requirements as gaps.
- Discuss adaptability for different police service requirements.
- Document your findings in a clear manner, either in a README, Word document, or any other format.

This exercise is to understand your foresight and ability to think from a product mindset in a concise manner.

## Time Frame

We estimate that the above sections will take about 10 hours total. To be respectful of your time, complete what you are able to in that time allowance and provide us a brief summary of improvements and extensions that you would like to make given more time.

Please complete the submission within 10 days of receiving this email.

## Submission Requirements

### Code Repository

- Share a link to your private repository with daniyar@tryrubicon.com, daniel@tryrubicon.com, and alistair@tryrubicon.com, supriya@tryrubicon.com containing all source code, assets, and relevant files for the task.
- Do NOT make this repository public, as other candidates will receive the same take-home project.

### Hosting (Optional)

- If you've chosen to host the web app, provide the direct link to access it online.

### Documentation

- Include a well-structured README or another documentation file. This should encompass setup and run instructions for local development if any changes have been made to our initial Docker setup.

Your efforts will give us insights into your coding capabilities, design choices, and product mindset. Best of luck!
