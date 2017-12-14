const Stepper = require('./lib/stepper');
const Board = require('./lib/board');
const EtherPort = require('etherport');

const board = new Board({
  port: new EtherPort(3030),
  timeout: 1e5
});

board.on('ready', function() {
  const stepper = new Stepper({
    type: Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 64,
    pins: [14, 12, 13, 15]
  });

  moveMotor = (steps, cb) => {
    return stepper
      .rpm(60)
      .direction(1)
      .step(steps, cb);
  };

  this.repl.inject({
    moveMotor,
    stepper
  });
});

board.on('error', function(err) {
  console.log('There was an error' + err);
});
