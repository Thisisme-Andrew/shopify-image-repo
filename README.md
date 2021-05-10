## Before Getting Started

There is a txt file in the root of this project called database-plan.txt that outlines the design of my back end. You will notice in this file that there is 2 seperate places data is being stored, one called Storage and another called Real Time. These is the 2 different places I have used to store with the use of Google's Firebase services. Documentation here:

Storage:
https://firebase.google.com/docs/storage

Real Time:
https://firebase.google.com/docs/database

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start using the image repo demo by hard coding the API key into the firebase.js file in config > firebase > firebase.js as such:

const firebaseConfig = {
apiKey: "AIzaSyDZhqFmt3F6LByqIPScBXsSRgoOOUUB1m8"
.....
.....
}

** Note please use same Api key above as it is directly linked to my database.

## Usage Instructions

Upon opening http://localhost:3000 in your browser, the first page you will see is a login page. Here you will be able to log in with a Google account into the app. 

After logging in, you will be brought to the Home page where all images of all images are being stored. This is where you can also navigate to logout (which will not allow you see users information anymore), go to your personal profile or visit another users page. 

If you navigate to your personal profile, then you will see options to upload an image with 3 types of information required. You will need to upload a file, put in a title for the image as well as choose if the image is public (by default false) then press upload. After the image is uploaded you will see it appear onto your screen. Here you will also notice an option to remove images under each image as well.

If you native to another user's profile you will see their name, email and photos that they uploaded without the options to remove or add.

## Notes

You may have noticed that there is an extreme lack of test files. Unfortunetly during the last few days as I was preparing to do these files I have become extremely ill and am currently waiting to hear from my covid results. I apologize for this, and would love to upload this as a second commit if possible. 

If you have any questions feel free to email me at andy.tang@shopify.com

