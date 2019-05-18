let home = false
let T4 = 0
let T3 = 0
let T2 = 0
function avoid() {
    robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        150,
        robotbit.Motors.M2B,
        160
    )
    basic.pause(2000)
}
function forward() {
    robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        75,
        robotbit.Motors.M2B,
        -75
    )
    basic.pause(2000)
}
function roam() {
    if (makerbit.isUltrasonicDistanceLessThan(30, DistanceUnit.CM)) {
        avoid()
        basic.showIcon(IconNames.No)
    } else {
        forward()
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        basic.showLeds(`
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            . . . . .
            `)
        basic.showLeds(`
            # . # . #
            . . # . .
            . . # . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . # . .
            . . # . .
            . . . . .
            . . . . .
            . . # . .
            `)
        basic.showLeds(`
            . . # . .
            . . . . .
            . . . . .
            . . # . .
            . # # # .
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . # # # .
            # . # . #
            `)
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            `)
    }
}
function detectSignal() {
    T2 = pins.analogReadPin(AnalogPin.P0)
    T3 = pins.analogReadPin(AnalogPin.P1)
    T4 = pins.analogReadPin(AnalogPin.P2)
    home = false
    if (T2 <= 23 && T3 <= 23 && T4 <= 23) {
        home = false
    } else if (T2 > 23) {
        home = true
    } else if (T3 > 23) {
        home = true
    } else {
        home = true
    }
}
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    makerbit.connectUltrasonicDistanceSensor(DigitalPin.P13, DigitalPin.P14)
    detectSignal()
    if (home) {
        robotbit.MotorStopAll()
        music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        while (home) {
            basic.showIcon(IconNames.Heart)
            basic.showIcon(IconNames.SmallHeart)
        }
    } else if (!(home)) {
        roam()
    } else {
        basic.showIcon(IconNames.Sad)
        robotbit.MotorStopAll()
    }
})
