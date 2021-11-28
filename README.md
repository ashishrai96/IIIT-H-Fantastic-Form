# IIIT-H-Fantastic-Form

>## Overview
- This project deals with the:
    - Creation and management of survey form.
    - Generation of transcript of .mp3 file.

- It comes with the following functionalities:
    - Authentication and Authorization
        - User need to have an account to access the application as well as perform the survey.
        - User can add a new account, as well as delete the existing account.
    - Form creation and validations.
        - User can create a form only with valid inputs.
        - Questions fields are mandatory for creation.
        - Form title is required.
        - No duplicate questions are allowed.
        - No question can have duplicate options in case of MSQ & MCQ type questions.
    - Preview Mode.
        - User has the accessability to have a look and feel of the form before publishing, showing how the form will look when published for responses intake.
    - Form Publication.
        - Once the form is published, No changes can be done.
    - Form Submission.
        - Mandatory questions of the published have to be answered before submitting, else will not work.
        - Answer added can be cleared in one click.
    - Summary of Form Responses
        - Responses can only be seen by Form creator.
        - Statistics of the responses can be visualised for each questions from all submissions via graphical representation.
        - For MSQs and MCQs, pie chart is being used.
        - For Likert Scale, stacked-bar graph is used.
    - Individual Responses.
        - There is an option for form creator to view individual form submission.
    - Export Excel of responses.
        - Creator of the form download the responses into an excel file.
    - Form Deactivation.
        - Creator can deactivate a form, that will stop user to input responses.
        - This is a one way journey, i.e., once the form is deactivated, it wont be re-activated. Although, the excel export of the existing responses will be available.
    - Form Deletion.
        - Creator can delete the form as well it responses.
        - No rollback is available, once the form is deleted.
    - Trnascript Generation.
        - User can generate a transcript of the audio file uploaded in .mp3 format only, and the text will be displayed on the screen.
    - Toast Message feedback.
        - Every functionality is being supported by popup toast message, that will serve as the response for every user actions.
    
>## Execution
- The code base for the backend/server-end and front/client-end are being maintained in 2 separate directories viz., IHFF-API and IHFF-UI respectively.
- Server - (Backend)
    1. **Pre-requisite**: Python3, Pip3
    2. Navigate to the directory (IHFF-API), where app.py is present.
    3. **Download-dependencies**:
        ```
        pip3 install -r requirements.txt
        ```
    4. **Run Server**: 
        ```
        python3 app.py
        ```

- Client - (Frontend)
    1. Pre-requisites: Node, Angular
    2. Navigate to the directory (ITFF-UI), where package.json is present.
    3. Install the dependencies:
        ```
        npm install
        ```
    4. Run application:
        ```
        npm start
        ```

- **Please Note:** The default port for Server side code is 5000 and that of client side code is 4200.

>## Assumptions
- Blank forms, without questions cannot be published.
- Forms once deactivated, it cannot be activated again.
- Form deletion deals with Hard deletion, with its responses.
- User is supposed to login/register, before filling the form.
- Using Sha3_256 hashing algorithm to protect passwords.
- Audio format for transcript generation must be mp3 only.
