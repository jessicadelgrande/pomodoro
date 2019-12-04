// Pomodoro timer
// when the Pomodoro button is pressed, display 25:00 on the screen and begin counting down
// when the short break button is pressed, display 5:00 on the screen and begin counting down
// when the long break button is pressed, display 30:00 on the screen and begin counting down
// stop the timer at 0:00 after each unit has elapsed
// (was going to use moment.js but realized I could just use seconds and built-in methods)
// bonus: indicate (sound? colour?) when one unit has elapsed
// bonus: add .selected class to indicate which kind of timer is running
// bonus: add a counter to show how many Pomodoros have passed
// bonus: at 4 Pomodoros suggest a longer break

$(function() {
	// document ready

	// collecting all my variables up here so they're global
	let counting;
	const $theTime = $('.timerDisplay');
	const $endTime = $('.endTime');
	const $buttons = $('[data-time]');

	function theTimer(seconds) {
		// clear any timer that's already running
		// so only one timer can run at a time
		clearInterval(counting);
		// the timer does weird things (skips, stops timing) if you tab away from it
		// the internet told me that the Date object is how I solve this problem
		// because it calculates time based on a fixed number
		// rather than a relative measure stored on the user machine
		const now = Date.now();
		const then = now + seconds * 1000;
		timeLeft(seconds);

		// the numbers decrementing
		counting = setInterval(function() {
			// needs to be Math.round so numbers don't get skipped
			const secondsLeft = Math.round((then - Date.now()) / 1000);
			// change the background color to show that time is almost up
			if(secondsLeft <= 0) {
				$('body').css("background-color", "white");
			} else if(secondsLeft <= 10) {
				$('body').css("background-color", "papayawhip");
			}
			// stop the timer
			if(secondsLeft < 0) {
				clearInterval(counting);
				return;
			}
			// display the time
			theTimer(secondsLeft);
		}, 1000);
	}

	function timeLeft(seconds) {
		// Math.floor because I want the number of the minutes that is less than the total seconds
		const minutes = Math.floor(seconds / 60);
		const secondsLeft = seconds % 60;
		// use ternary to craft an if/else statement
		const display = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
		// put the time on the screen
		$theTime.text(display);
	}

	function startTimer() {
		// get the time from the button that is clicked (this)
		// pass it as the seconds placeholder
		// this allows the button itself to hold its own value
		// so much easier than writing a new function for each button!
		const seconds = parseInt(this.dataset.time);
		theTimer(seconds);
	}

	// when any button is clicked, start the timer!
	// magical!
	$buttons.on('click', startTimer);

}); // end of document ready
