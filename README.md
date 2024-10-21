# Paragon AI Engineering Assessment

## My Solution
Thinking about how I personally would prefer to be presented with a new feature I knew I wanted something noticable but not intrusive. I opted to build a dismissable alert box that appears at the top of the web page. The back-end records when the user dismisses it so it remains hidden even on subsequent loads, as well as other devices.

## Tech Stack
- NodeJS / TypeScript
- MongoDB
- ReactJS

## Functionality / Features

**Back-end**
- API endpoints to fetch, create, and list features.
- API endpoint to show the feature that should currently be displayed, can be blank if all have been dismissed.
- API endpoint to flag feature as viewed/dismissed.

**Front-end**
- Fetch user and feature information from back-end.
- User login component, displays the current user, which is always 'test_user'.
- Alert box
    - Displays any text passed in.
    - Accepts callbacks for when read more or dismiss buttons are clicked.
    - Feature information is passed in and feature is flagged as viewed through the above mentioned callbacks.
- Feature information page
    - This is where the "read more" button takes you.
- Dev tools
    - Reset view flag.

## Other Things If I Had More Time
- Add/remove/update feature informations from admin UI.
- Allow customizations to alert box, like chaging the read more button text or background color.
- Better error handling on both front-end and back-end, a error modal would be nice.
- Improve the database query used to fetch the feature that should be displayed.
- Animate the alert, slide in/slide out.