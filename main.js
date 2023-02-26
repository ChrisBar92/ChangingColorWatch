const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const historyBtn = document.querySelector('.history')
const stopwatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time')
const timeList = document.querySelector('.time-list')

const infoBtn = document.querySelector('.info')
const modalShadow = document.querySelector('.modal-shadow')
const closeModalBtn = document.querySelector('.modal__close')

let countTime
let minutes = 0
let seconds = 0

let timesArr = []

const handleStart = () => {
	clearInterval(countTime)

	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++
			stopwatch.textContent = `${minutes}:0${seconds}`
		} else if (seconds >= 9 && seconds < 59) {
			seconds++
			stopwatch.textContent = `${minutes}:${seconds}`
		} else {
			minutes++
			seconds = 0
			stopwatch.textContent = `${minutes}:00`
		}
	}, 100)
}

// przycisk stop sprawdza warunek i dodaje visibility visible jeśli jest true
// do pustej tablicy timesArr dodaje wartości przy jakich wciśnięto stop
const handleStop = () => {
	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible'
		timesArr.push(stopwatch.textContent)
	}

	time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`

	clearStuff()
}

const handlePause = () => {
	clearInterval(countTime)
}

//reset nadaje klasie time visibility hidden
// reset czyści tablicę z zapisanymi wcześniej wynikami
// wykonuje funkcję clearStuff
const handleReset = () => {
	time.style.visibility = 'hidden'
	timesArr = []
	clearStuff()
}

// zatrzymuje setInterval
// elementowi z klasą stopwatch zmienia tekst na '0:00
// czyści ul listę "timeList"
// przypisuje sekundom i minutom wartość 0
const clearStuff = () => {
	clearInterval(countTime)
	stopwatch.textContent = '0:00'
	timeList.textContent = ''
	seconds = 0
	minutes = 0
}

//timelist.textContent = '' została dodana jako zabiezpieczenie żeby cała ta lista została najpierw czyszczona i dopiero potem odpala się pętla
const showHistory = () => {
	timeList.textContent = ''
	let num = 1

	timesArr.forEach(time => {
		const newTime = document.createElement('li')
		newTime.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`

		timeList.append(newTime)
		num++
	})
}

const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block'
		console.log('jestoko')
	} else {
		modalShadow.style.display = 'none'
	}
	modalShadow.classList.toggle('modal-animation')
}

startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', handlePause)
stopBtn.addEventListener('click', handleStop)
resetBtn.addEventListener('click', handleReset)
historyBtn.addEventListener('click', showHistory)
infoBtn.addEventListener('click', showModal)
closeModalBtn.addEventListener('click', showModal)


// zamknięcie modala poza modalem
window.addEventListener('click', e => {
	e.target === modalShadow ? showModal() : false
})
