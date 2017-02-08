module.exports = function(Message) {
  // call the rest of the code and have it execute after n seconds
  console.log("App started successfully...");

    Message.status = function(holdtime, cb) {


   var currentDate = new Date();
   var currentHour = currentDate.getHours();
   var OPEN_HOUR = 6;
   var CLOSE_HOUR = 20;

   var response;
   if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
//     response = 'We are open for business. Process# '+process.pid+' was kept on hold for '+holdtime+'ms.';
       response = 'We are open for business.';
   } else {
//     response = 'Sorry, we are closed. Open daily from 6am to 8pm. Process# '+process.pid+' was kept on hold for '+holdtime+'ms.';
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
   }
   console.log("requested holdtime: "+holdtime);
   function sleep(time, callback) {
     console.log("process# "+process.pid+" is kept on hold");
       var stop = new Date().getTime();
       var pulsor = stop;
       while(new Date().getTime() < stop + time) {

            if(new Date().getTime() == pulsor+500){
              console.log(process.pid+" is still on hold...");
              pulsor=pulsor+500;
            }
       }
       console.log("process# "+process.pid+" is now released.");
       callback();
   }

   sleep(holdtime, function() {
      // executes after one second, and blocks the thread
      cb(null, response);
   });

   //cb(null, response);
 };

Message.followup = function(cb) {
  console.log("function followup invokved...");
  var response = "Process# "+process.pid+" from followup";
  function active(callback) {
    callback();
  }
  active(function() {
     // executes after one second, and blocks the thread
     cb(null, response);
  });
};

 Message.remoteMethod(
   'status', {
     http: {
       path: '/status',
       verb: 'get'
     },
     accepts: {arg: 'holdtime', type: 'number'},
     returns: {
       arg: 'status',
       type: 'string'
     }
   }
 );


Message.remoteMethod(
    'followup', {
      http: {
        path: '/followup',
        verb: 'get'
      },
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  );
};
