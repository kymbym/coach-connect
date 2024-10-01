# Pulse

Pulse is your go-to platform for finding the perfect coach tailored to your sport. Whether you’re looking to improve your game or stay fit, Pulse connects you with professional coaches who can guide you on your fitness journey and become your ideal training partner.

![main page](/frontend/public/images/main-page.png)

This project has been independently undertaken by me (Kymmy), aimed at building a full-stack web app using the PERN stack (PostgreSQL, Express, React, Node.js).

## Getting Started

Create a user account today to find your perfect coach! Browse the homepage to explore available coaches and book your sessions.

![login page](/frontend/public/images/login-page.png)

![user dashboard](/frontend/public/images/user-dashboard.png)

To schedule a class, simply click on an availability in a coach's profile and then hit the 'Book' button, and keep track of your upcoming classes on your user dashboard.

![coach profile](/frontend/public/images/coach-profile.png)

![book class](/frontend/public/images/book-class.png)

As a coach, create an account and start managing your availability by scheduling events in the calendar.

![coach signup page](/frontend/public/images/sign-up-page.png)

![partner dashboard + add availability form](/frontend/public/images/create-availability.png)

Keep your schedule up-to-date by using the 'Update' button, or cancel sessions as needed with the 'Delete' button to keep your clients informed and engaged.

![event details card](/frontend/public/images/event-card.png)

![update availability form](/frontend/public/images/update-availbility.png)

If a coach cancels a class with participants already booked, an email notification will be sent to all attendees, informing them of the cancellation.

![email notification](/frontend/public/images/email-notification.png)

## Attributions & Credits

- [Flowbte](https://flowbite.com/)
- [Pinterest](https://www.pinterest.com/)

## Technologies Used

- HTML, CSS, JavaScript, PostgreSQL, Express.js, React, Node.js, AWS S3 (for image uploads)

## Next Steps

***This project is still a work in progress (WIP), and there are many next steps to work towards. This represents just version 1 of the application***

- Implement notifications or alert for when class bookings reach maximum capacity
- Display bookings on the coach dashboard under each specific availability
- Allow users to view all their bookings under each specific coach
- Prevent coaches from reducing the maximum number of participants below the current number of bookings, with an alert for this condition
- Update calendar colors based on different sports, etc
- Filtering options by sport, coach name, and sorting availabilities
- Add a bio section to the Coach Card
- Allow users to reschedule and cancel their bookings, ensuring changes reflect on the coach profile
- Ensure that changes to maximum participants are accurately reflected
