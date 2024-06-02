**Team name & your members** <br>
Grace Roseman, Ankita Budhraja, Drake White, Lingxiao Pan <br>

**What was your original goal and how much of it were you able to achieve?** <br>
Our original goal was to create a movie guessing game using the TMDB API where users will be shown hints about the movie and users will have to guess what movie it is. We also wanted users to select a genre to pull from, a difficulty level, and/or select movies from a specific year range. We were able to achieve some of our goal but did not have time to add functionality to show hints or choose movies from a specific year. <br>

**A description of what your project does and the functionality that it provides** <br>
Overview: We developed an interactive game that allows users to choose a movie genre. Subsequently, a random movie from the selected genre is retrieved using the TMDB API. The challenge for the user is to guess the movie by suggesting letters. Users can choose the difficulty level in which there is a limit on the number of attempts they have. Once the attempts are exhausted, the correct answer is revealed to them. <br>

Additional Functionality<br>
Login Page
- Users have to login to access the game 
- If the user does not yet have an account they will have to create one
- Users can reset their password
- User login information is saved to local storage

Movie Game
- Users select a genre from a dropdown
- Users choose difficulty level where Easy is 15 chances, Medium 10, and Difficult 5
- Users see the letter configuration of a random movie
- Users name is shown with a welcome message
- Users guess letters by either typing in a letter or clicking on a letter
- The game displays if the guess was correct or not
- If letter is a correct guess, letter is put in correct position (like hangman) 
- Game updates to show the user how many chances they have left
- When the number of chances is up, the answer is revealed
- When time is up, the answer is revealed
- Users can restart the game, or exit out of the game <br>

**What did you learn from the project? Talk about the mistakes you made, challenges you overcame or the tools that you got to learn etc** <br>
In this project, we got to learn how to use React, use an external API in React, and work collaboratively in the files. Some challenges we encountered included making api calls from react and manipulating that data. It was also challenging to make our application a game instead of just displaying stuff. Also, most movies from the API were ones that we haven’t heard of so it was difficult to test our application. We also experienced some general challenges figuring out how react works and working collaboratively with react. 
