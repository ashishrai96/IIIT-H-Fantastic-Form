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

>## Folder Structure
    .
    ├── IHFF-API
    │   ├── README.md
    │   ├── __pycache__
    │   │   └── db.cpython-38.pyc
    │   ├── app.py
    │   ├── db.py
    │   ├── models
    │   │   ├── __init__.py
    │   │   ├── __pycache__
    │   │   │   ├── __init__.cpython-38.pyc
    │   │   │   ├── __init__.cpython-39.pyc
    │   │   │   ├── form.cpython-38.pyc
    │   │   │   ├── form.cpython-39.pyc
    │   │   │   ├── item.cpython-39.pyc
    │   │   │   ├── option.cpython-38.pyc
    │   │   │   ├── question.cpython-38.pyc
    │   │   │   ├── question.cpython-39.pyc
    │   │   │   ├── response.cpython-38.pyc
    │   │   │   ├── statement.cpython-38.pyc
    │   │   │   ├── store.cpython-39.pyc
    │   │   │   ├── user.cpython-38.pyc
    │   │   │   └── user.cpython-39.pyc
    │   │   ├── form.py
    │   │   ├── option.py
    │   │   ├── question.py
    │   │   ├── response.py
    │   │   ├── statement.py
    │   │   └── user.py
    │   ├── requirements.txt
    │   └── resources
    │       ├── __init__.py
    │       ├── __pycache__
    │       │   ├── __init__.cpython-38.pyc
    │       │   ├── form.cpython-38.pyc
    │       │   ├── question.cpython-38.pyc
    │       │   ├── response.cpython-38.pyc
    │       │   ├── transcript.cpython-38.pyc
    │       │   └── user.cpython-38.pyc
    │       ├── form.py
    │       ├── question.py
    │       ├── response.py
    │       ├── transcript.py
    │       └── user.py
    ├── IHFF-UI
    │   ├── README.md
    │   ├── angular.json
    │   ├── karma.conf.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │   │   ├── app
    │   │   │   ├── app-routing.module.ts
    │   │   │   ├── app.component.html
    │   │   │   ├── app.component.scss
    │   │   │   ├── app.component.spec.ts
    │   │   │   ├── app.component.ts
    │   │   │   ├── app.module.ts
    │   │   │   ├── auth
    │   │   │   │   ├── auth-guard.service.ts
    │   │   │   │   ├── auth-interceptor.service.ts
    │   │   │   │   └── auth.service.ts
    │   │   │   ├── components
    │   │   │   │   ├── audio-transcript
    │   │   │   │   │   └── audio-transcript.component.scss
    │   │   │   │   ├── dashboard
    │   │   │   │   │   ├── dashboard.component.html
    │   │   │   │   │   ├── dashboard.component.scss
    │   │   │   │   │   ├── dashboard.component.spec.ts
    │   │   │   │   │   └── dashboard.component.ts
    │   │   │   │   ├── login
    │   │   │   │   │   ├── login.component.html
    │   │   │   │   │   ├── login.component.scss
    │   │   │   │   │   ├── login.component.spec.ts
    │   │   │   │   │   ├── login.component.ts
    │   │   │   │   │   └── service
    │   │   │   │   │       └── login.service.ts
    │   │   │   │   ├── signup
    │   │   │   │   │   ├── service
    │   │   │   │   │   │   └── signup.service.ts
    │   │   │   │   │   ├── signup.component.html
    │   │   │   │   │   ├── signup.component.scss
    │   │   │   │   │   ├── signup.component.spec.ts
    │   │   │   │   │   └── signup.component.ts
    │   │   │   │   └── survey-builder
    │   │   │   │       ├── audio-transcript
    │   │   │   │       │   ├── audio-transcript.component.html
    │   │   │   │       │   ├── audio-transcript.component.scss
    │   │   │   │       │   ├── audio-transcript.component.spec.ts
    │   │   │   │       │   ├── audio-transcript.component.ts
    │   │   │   │       │   └── service
    │   │   │   │       │       └── audio-transcript.service.ts
    │   │   │   │       ├── survey-builder-data-exchange.service.ts
    │   │   │   │       ├── survey-builder.component.html
    │   │   │   │       ├── survey-builder.component.scss
    │   │   │   │       ├── survey-builder.component.spec.ts
    │   │   │   │       ├── survey-builder.component.ts
    │   │   │   │       ├── survey-builder.service.ts
    │   │   │   │       └── survey-form
    │   │   │   │           ├── form-live
    │   │   │   │           │   ├── form-live.component.html
    │   │   │   │           │   ├── form-live.component.scss
    │   │   │   │           │   ├── form-live.component.spec.ts
    │   │   │   │           │   └── form-live.component.ts
    │   │   │   │           ├── form-questions
    │   │   │   │           │   ├── form-card
    │   │   │   │           │   │   ├── form-card.component.html
    │   │   │   │           │   │   ├── form-card.component.scss
    │   │   │   │           │   │   ├── form-card.component.spec.ts
    │   │   │   │           │   │   ├── form-card.component.ts
    │   │   │   │           │   │   └── form-likert-scale
    │   │   │   │           │   │       ├── form-likert-scale.component.html
    │   │   │   │           │   │       ├── form-likert-scale.component.scss
    │   │   │   │           │   │       ├── form-likert-scale.component.spec.ts
    │   │   │   │           │   │       └── form-likert-scale.component.ts
    │   │   │   │           │   ├── form-questions.component.html
    │   │   │   │           │   ├── form-questions.component.scss
    │   │   │   │           │   ├── form-questions.component.spec.ts
    │   │   │   │           │   └── form-questions.component.ts
    │   │   │   │           ├── form-responses
    │   │   │   │           │   ├── form-response-card
    │   │   │   │           │   │   ├── form-response-card.component.html
    │   │   │   │           │   │   ├── form-response-card.component.scss
    │   │   │   │           │   │   ├── form-response-card.component.spec.ts
    │   │   │   │           │   │   └── form-response-card.component.ts
    │   │   │   │           │   ├── form-responses.component.html
    │   │   │   │           │   ├── form-responses.component.scss
    │   │   │   │           │   ├── form-responses.component.spec.ts
    │   │   │   │           │   └── form-responses.component.ts
    │   │   │   │           ├── form-submitted
    │   │   │   │           │   ├── form-submitted.component.html
    │   │   │   │           │   ├── form-submitted.component.scss
    │   │   │   │           │   ├── form-submitted.component.spec.ts
    │   │   │   │           │   └── form-submitted.component.ts
    │   │   │   │           ├── survey-form.component.html
    │   │   │   │           ├── survey-form.component.scss
    │   │   │   │           ├── survey-form.component.spec.ts
    │   │   │   │           └── survey-form.component.ts
    │   │   │   └── shared
    │   │   │       ├── components
    │   │   │       │   ├── loader
    │   │   │       │   │   ├── loader.component.html
    │   │   │       │   │   ├── loader.component.scss
    │   │   │       │   │   ├── loader.component.spec.ts
    │   │   │       │   │   ├── loader.component.ts
    │   │   │       │   │   └── loader.service.ts
    │   │   │       │   └── not-found
    │   │   │       │       ├── not-found.component.html
    │   │   │       │       ├── not-found.component.scss
    │   │   │       │       ├── not-found.component.spec.ts
    │   │   │       │       └── not-found.component.ts
    │   │   │       ├── models
    │   │   │       │   ├── constants.model.ts
    │   │   │       │   └── form-element.model.ts
    │   │   │       └── shared.module.ts
    │   │   ├── assets
    │   │   │   ├── images
    │   │   │   │   └── favicon.ico
    │   │   │   ├── json
    │   │   │   │   ├── common.json
    │   │   │   │   ├── login.json
    │   │   │   │   └── signup.json
    │   │   │   └── scss
    │   │   │       ├── button.scss
    │   │   │       ├── inputs.scss
    │   │   │       ├── p-avatar.scss
    │   │   │       ├── p-dataview.scss
    │   │   │       ├── p-dropdown.scss
    │   │   │       ├── p-inputswitch.scss
    │   │   │       ├── p-orderlist.scss
    │   │   │       ├── p-radio-check.scss
    │   │   │       └── p-togglebutton.scss
    │   │   ├── environments
    │   │   │   ├── environment.prod.ts
    │   │   │   └── environment.ts
    │   │   ├── favicon.ico
    │   │   ├── index.html
    │   │   ├── main.ts
    │   │   ├── polyfills.ts
    │   │   ├── styles.scss
    │   │   └── test.ts
    │   ├── tsconfig.app.json
    │   ├── tsconfig.json
    │   └── tsconfig.spec.json
    └── README.md