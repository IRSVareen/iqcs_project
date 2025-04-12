// socket.js
module.exports = function(io) {
    let defected = 500;
    let notDefected = 9000;
  
    const incrementDefected = 10;
    const incrementNotDefected = 200;
  
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
  
      // Immediately send initial data when client connects
      socket.emit('updateData', {
        defected,
        notDefected,
        efficiency: parseFloat(((notDefected * 100) / (defected + notDefected)).toFixed(2))
      });
  
      // Optionally listen to events from client
      socket.on('getCurrentData', () => {
        socket.emit('updateData', {
          defected,
          notDefected,
          efficiency: parseFloat(((notDefected * 100) / (defected + notDefected)).toFixed(2))
        });
      });
    });
  
    // Broadcast updated data to all clients every 2 seconds
    setInterval(() => {
      defected += incrementDefected;
      notDefected += incrementNotDefected;
      const efficiency = parseFloat(((notDefected * 100) / (defected + notDefected)).toFixed(2));
  
      const data = {
        defected,
        notDefected,
        efficiency
      };
  
      io.emit('updateData', data);
    }, 2000);
  };
  