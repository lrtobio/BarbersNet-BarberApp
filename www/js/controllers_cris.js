/* global controller */

/* global controller, angular */

angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicHistory, $ionicLoading, 
        $location, App, $ionicPopup, $rootScope, Barbers, $window) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        
        //console.log('AppCtrl');
       
        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            //console.log('Doing login', $scope.loginData.password);

            //$location.path('/app/appointments');
            //localStorage.setItem('Barber', '');
            localStorage.setItem('Barber', null);


            $scope.show = function () {
                $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                });
            };

            $scope.hide = function () {
                $ionicLoading.hide();
            };


            //console.log($scope.loginData);
            if ($scope.loginData != null &&
                    ($scope.loginData.email != null && $scope.loginData.email != '') &&
                    ($scope.loginData.password != null && $scope.loginData.password != '')) {
                $scope.loginData.enviadopor = 'barber';
                $scope.show();
                App.login($scope.loginData).then(function successCallback(result) {
                    // this callback will be called asynchronously
                    // when the response is available
                    
                    //console.log(result);
                    $scope.hide();
                    
                    //console.log('here1');

                    if (result != null && result.data != null && result.data.response != null) {
                        
                        //console.log('here2');
                        if (result.data.response.success == true) {
                            //console.log('here3');
                            
                            localStorage.setItem('Barber', JSON.stringify(result.data.response.data));
                            //console.log('here4');
                            
                            
                            var push = new Ionic.Push({
                                "debug": true,
                                "onNotification": function(notification) {

                                    var payload = notification.payload;
                                    //console.log(notification, payload);

                                    //console.log(notification);
                                    //console.log(payload);

                                    if( payload!=null ){

                                        if( payload.action && 
                                                payload.action!=null && payload.action!='' ){

                                            if( payload.action=='appointment_added' ){                             

                                                var appointment_id = '', fecha = '';

                                                if( payload.appointment_id && 
                                                    payload.appointment_id!=null && payload.appointment_id!='' ){

                                                    appointment_id = payload.appointment_id;
                                                }

                                                if( payload.fecha && 
                                                    payload.fecha!=null && payload.fecha!='' ){

                                                    fecha = payload.fecha;
                                                }
                                                
                                                //console.log('push recibido - AppCtrl');
                                                //console.log( payload.action + ' - ' + appointment_id + ' - ' + fecha );

                                                //$location.path('/app/appointments2/' + appointment_id + '/' + fecha);

                                                
                                                //$ionicHistory.nextViewOptions({
                                                //    disableAnimate: true,
                                                //    disableBack: true,
                                                //    historyRoot: true
                                                //});
                                                
                                               
                                               if( $ionicHistory.currentView().stateName &&
                                                       $ionicHistory.currentView().stateName!=null &&
                                                            $ionicHistory.currentView().stateName!='' ){
                                                   
                                                    //if( $ionicHistory.currentView().stateName=='app.appointments' )
                                                    //    $window.location.href = ('#/app/appointments2/' + appointment_id + '/' + fecha);
                                                    //else
                                                    if( $ionicHistory.currentView().stateName=='app.appointments2' )
                                                        $window.location.href = ('#/app/appointments3/' + appointment_id + '/' + fecha);
                                                    else  
                                                        $window.location.href = ('#/app/appointments2/' + appointment_id + '/' + fecha);
                                                        
                                                }else
                                                    $window.location.href = ('#/app/appointments2/' + appointment_id + '/' + fecha);
                                                
                                                
                                                //$location.path('/app/appointments2/' + appointment_id + '/' + fecha);
                                                //$window.location.reload(true);
                                            }else if( payload.action=='appointment_deleted' ){
                                    
                                                var appointment_id = '', fecha = '', service = '', client = '';

                                                if( payload.appointment_id && 
                                                    payload.appointment_id!=null && payload.appointment_id!='' ){

                                                    appointment_id = payload.appointment_id;
                                                }

                                                if( payload.fecha && 
                                                    payload.fecha!=null && payload.fecha!='' ){

                                                    fecha = payload.fecha;
                                                }

                                                if( payload.service && 
                                                    payload.service!=null && payload.service!='' ){

                                                    service = payload.service;
                                                }

                                                if( payload.client && 
                                                    payload.client!=null && payload.client!='' ){

                                                    client = payload.client;
                                                }

                                                $ionicPopup.alert({
                                                    //title: 'Info',
                                                    template: ( 'Appointment deleted.<br/>\n' + service + '. ' + fecha + '. From ' + client )
                                                });
                                            }
                                        }
                                    }
                                }
                            });


                            push.register(function(token) {
                                
                                //console.log("Device token:", token.token);

                                if( token.token && token.token!=null && token.token!='' ){

                                    push.saveToken(token);  // persist the token in the Ionic Platform

                                    var updateUserToken = false;

                                    //var barber = JSON.parse(localStorage.getItem('Barber'));

                                    //f( barber!=null && barber!='' && barber!='null' ){

                                        var barber = JSON.parse(localStorage.getItem('Barber'));
                                        
                                        //console.log("barber token:", barber.Barber.tokenpush);

                                        if( barber.Barber && barber.Barber.tokenpush && barber.Barber.tokenpush!=null && 
                                                barber.Barber.tokenpush!='' ){

                                            if( barber.Barber.tokenpush!=token.token )
                                                updateUserToken = true;

                                        }else
                                            updateUserToken = true;
                                    //}

                                    if( updateUserToken==true ){

                                        show = function () {
                                            $ionicLoading.show({
                                                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                                            });
                                        };

                                        hide = function () {
                                            $ionicLoading.hide();
                                        };

                                        var barberData = {
                                            barber_id: barber.Barber.id,
                                            tokenpush: token.token,

                                            foto: '',
                                            direccion: '',
                                            telefono: '',
                                            currency: '',
                                            email: '',
                                            duracioncita: '',
                                            paypalemail: '',
                                            impuestos: '',
                                            extensionfoto: '',
                                            descripcion: '',
                                            codigoreferido: '',
                                            nombrebarberia: '',
                                            latitud: '',
                                            longitud: '',
                                            password: '',
                                            walkin_client_id: ''
                                        };

                                        show();
                                        
                                        //console.log(barberData);

                                        Barbers.saveBarberEditProfile(barberData).then(function successCallback(result) {

                                            //console.log(result);

                                            hide();

                                            if (result!= null && result.data!= null && result.data.response != null) {
                                                //$scope.services = JSON.parse( JSON.stringify(result.data.response.data) );

                                                if (result.data.response.success == true)
                                                    localStorage.setItem('Barber', JSON.stringify(result.data.response.data));

                                            }

                                        }, function errorCallback(response) {
                                            // called asynchronously if an error occurs
                                            // or server returns response with an error status.

                                            hide();
                                        });
                                    }
                                }
                            });
                            
                            
                            //console.log('here5');
                            
                            var barber = JSON.parse(localStorage.getItem('Barber'));
                            
                            //console.log('here6');
                            
                            $rootScope.barberEmail = barber.Barber.email;
                            $rootScope.barberNombre = barber.Barber.nombre;
                            if(barber.Barber.foto_url != '' && barber.Barber.foto_url != null)
                                $rootScope.barberFoto = barber.Barber.foto_url;
                            else
                                $rootScope.barberFoto = 'img/barbersnet/img_nouser.png';
                            
                            
                            $ionicHistory.nextViewOptions({
                                disableAnimate: true,
                                disableBack: true,
                                historyRoot: true
                            });
                            
                            $location.path('/app/appointments');
                            
                            $scope.loginData.email = '';
                            $scope.loginData.password = '';
                            
                            //console.log('here7');
                            
                        } else {
                            
                            //console.log('here8');

                            var msg = "Login failed, please verify the info and try again";

                            if (result.data.response.message != null && result.data.response.message != '')
                                msg = result.data.response.message;

                            $ionicPopup.alert({
                                //title: 'Info',
                                template: msg
                            });

                            
                             //alertPopup.then(function(res) {
                             //si se desea hacer alguna accion al darle click en el boton OK
                             //console.log('Thank you for not eating my delicious ice cream cone');
                             //});
                             
                        }

                    } else {
                        
                        //console.log('here9');
                        
                        //alert( 'Error login' );
                        $ionicPopup.alert({
                            //title: 'Info',
                            template: 'Login error, please, try again'
                        });
                    }
                    
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    
                    //console.log('here10');
                    
                    $scope.hide();
                    
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'Login error, please, try again'
                    });
                });
                /*then(function (result) {

                    //console.log(result);
                    $scope.hide();

                    if (result != null && result.data != null && result.data.response != null) {

                        if (result.data.response.success == true) {
                            
                            localStorage.setItem('Barber', JSON.stringify(result.data.response.data));
                            
                            $ionicHistory.nextViewOptions({
                                disableAnimate: true,
                                disableBack: true,
                                historyRoot: true
                            });
                            
                            $location.path('/app/appointments');
                            
                            $scope.loginData.email = '';
                            $scope.loginData.password = '';

                        } else {

                            var msg = "Login failed, please verify the info and try again";

                            if (result.data.response.message != null && result.data.response.message != '')
                                msg = result.data.response.message;

                            $ionicPopup.alert({
                                //title: 'Info',
                                template: msg
                            });

                            
                             //alertPopup.then(function(res) {
                             //si se desea hacer alguna accion al darle click en el boton OK
                             //console.log('Thank you for not eating my delicious ice cream cone');
                             });
                             
                        }

                    } else {
                        //alert( 'Error login' );
                        $ionicPopup.alert({
                            //title: 'Info',
                            template: 'Login error, please, try again'
                        });
                    }
                });*/

            } else{

                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please type your email and password'
                });
            }
        };
        
        var barber = localStorage.getItem('Barber');
        
        if( barber!=null && barber!='' && barber!='null' ){
            
            barber = JSON.parse(localStorage.getItem('Barber'));
                            
            $rootScope.barberEmail = barber.Barber.email;
            $rootScope.barberNombre = barber.Barber.nombre;
            if(barber.Barber.foto_url != '' && barber.Barber.foto_url != null)
                $rootScope.barberFoto = barber.Barber.foto_url;
            else
                $rootScope.barberFoto = 'img/barbersnet/img_nouser.png';
            
            //console.log( $rootScope.barberFoto );
        }

        $scope.signOut = function () {
            
            $ionicPopup.confirm({
                //title: 'Info',
                template: 'Are you sure you want to log out ?'
                //default: 'cancel'
            }).then(function (res) {

                if (res) {
                    
                    var barber_id = '';
                    
                    {
                        var barber = localStorage.getItem('Barber');

                        if( barber!=null && barber!='' && barber!='null' ){
                            barber = JSON.parse(localStorage.getItem('Barber'));
                            
                            if( barber!=null )
                                barber_id = barber.Barber.id;
                        }
                    }
                    

                    //AuthService.login();
                    localStorage.setItem('Barber', '');
                    
                    $rootScope.barberEmail = '';
                    $rootScope.barberFoto = '';
                    $rootScope.barberNombre = '';

                    //vendedorEmail = '';
                    //$ionicHistory.clearCache();
                    //$ionicHistory.clearHistory();

                    //$ionicHistory.nextViewOptions({disableAnimate: true, disableBack: true, historyRoot: true});
                    
                    /*
                    if (navigator.app) {
                        navigator.app.exitApp();
                    } else if (navigator.device) {
                        navigator.device.exitApp();
                    } else {
                        
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true,
                            historyRoot: true
                        });
                        
                        $location.path('/app/login');
                    }
                    */
                   
                    
                    //deshabilitar el push
                    {
                        var push = new Ionic.Push({
                            "debug": true
                        });
                        push.unregister();
                        
                        show = function () {
                            $ionicLoading.show({
                                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                            });
                        };

                        hide = function () {
                            $ionicLoading.hide();
                        };

                        var barberData = {
                            barber_id: barber_id,
                            tokenpush: '-',

                            foto: '',
                            direccion: '',
                            telefono: '',
                            currency: '',
                            email: '',
                            duracioncita: '',
                            paypalemail: '',
                            impuestos: '',
                            extensionfoto: '',
                            descripcion: '',
                            codigoreferido: '',
                            nombrebarberia: '',
                            latitud: '',
                            longitud: '',
                            password: '',
                            walkin_client_id: ''
                        };

                        show();

                        Barbers.saveBarberEditProfile(barberData).then(function successCallback(result) {

                            //console.log(result);

                            hide();

                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.

                            hide();
                        });
                    }
                    
            
            
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true,
                        historyRoot: true
                    });

                    $location.path('/app/login');
                    //$location.path('/app/welcome');

                    //$ionicSideMenuDelegate.toggleLeft();
                }
            });
        };
        
        /*
        $scope.goToSignIn = function () {
            console.log('gotoSignIn');
            
            //$ionicHistory.nextViewOptions({
              //                  disableAnimate: true,
                //                disableBack: true,
                  //              historyRoot: true
                    //        });
                            
            $location.path('/app/signin');
        };
        
        $scope.goToSignIn2 = function () {
                            
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true,
                    historyRoot: true
                });

                $location.path('/app/signin');
        };
        */
       
        //$scope.dataForgot = {};
        $scope.forgotPassword = function () {
            
            show = function () {
                $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                });
            };

            hide = function () {
                $ionicLoading.hide();
            };
                            
            //alert('tejo');
            //$scope.data = { email2: '' };
            var myPopup = $ionicPopup.show({
                template: '<input type="email" id="emailForgot" ng-model="dataForgot.email2">',
                title: 'Enter your email',
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                  { text: 'Cancel' },
                  {
                    text: '<b>Send</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        
                        //console.log(data.email2);
                        //console.log($data.email2);
                        //console.log($scope.data.email2);
                        //console.log($scope.email2);
                        
                        var emailForgot = document.getElementById('emailForgot').value
                        if( emailForgot && emailForgot!=null && emailForgot!='' ){
                            
                            if( emailForgot.indexOf('@')>-1 ){
                                
                                show();
                                
                                //var barber = JSON.parse(localStorage.getItem('Barber'));
                                var barberData = {
                                    //barber_id: barber.Barber.id
                                    email: emailForgot,
                                    enviadopor: 'barber'
                                };

                                Barbers.requestRememberPassword(barberData).then(function successCallback(result) {

                                    hide();
                                    
                                    var msg = 'Please check you email inbox';
                                    
                                    if( result.data && result.data.response ){
                                        
                                        if( result.data.response.message!=null && result.data.response.message!='' )
                                            msg = result.data.response.message;
                                        else
                                            msg = "We could send an email with your password, please try again";

                                    }else
                                        msg = "We could send an email with your password, please try again";
                                    
                                    $ionicPopup.alert({
                                        //title: 'Info',
                                        template: msg
                                    });

                                }, function errorCallback(response) {
                                    // called asynchronously if an error occurs
                                    // or server returns response with an error status.

                                    hide();
                                    $ionicPopup.alert({
                                        //title: 'Info',
                                        template: 'Please verify your internet connection and try again'
                                    });
                                });
                                
                            }else{
                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: 'You must type a valid email'
                                });
                                e.preventDefault();
                            }
                            
                        }else{
                            
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'You must type your email'
                            });
                            e.preventDefault();
                        }
                      /*
                      if (!$scope.data.email2) {
                        
                        console.log( $data.email2 );
                          
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                      } else {
                        //return $scope.data.email2;
                        console.log( $data.email2 );
                      }
                      */
                      
                    }
                    
                  }
                ]
            });
            
            /*
            myPopup.then(function(res) {
                //console.log('Tapped!', res);
                console.log( document.getElementById('emailForgot').value );
            });
            */
        };
       
    })


    .controller('AppointmentsCtrl', function ($scope, Appointments, $ionicLoading, 
        $filter, $ionicPopup, $stateParams, Barbers, $ionicHistory, $state,
        $window, $ionicNavBarDelegate, $location, $ionicSideMenuDelegate) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        
        //localStorage.setItem('BarberServices', '');
        
        $ionicNavBarDelegate.showBackButton(false);
        
        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () { $ionicLoading.hide(); };

        var barber = JSON.parse(localStorage.getItem('Barber'));
        //console.log( barber );

        $scope.currency = barber.Barber.currency;

        /*
        $rootScope.barberEmail = barber.Barber.email;
        $rootScope. = barber.Barber.foto_url;
        $rootScope.barberNombre = barber.Barber.nombre;
        */

        var fecha = 'No date selected';
        
        
        if( $stateParams.fecha && $stateParams.fecha!=null && $stateParams.fecha!='' )
            fecha = $stateParams.fecha;
        else if( localStorage.getItem('fechaTempApps')!=null && localStorage.getItem('fechaTempApps')!='' &&
                localStorage.getItem('fechaTempApps')!='null' )
            fecha = localStorage.getItem('fechaTempApps');
        else
            fecha = $filter("date")(new Date(), 'yyyy-MM-dd');
        
        
        $scope.dataAppo = {
            date: fecha
        };
        
        $scope.appointment_id = '';
        if( $stateParams.appointment_id && $stateParams.appointment_id!=null &&
                $stateParams.appointment_id!='' )
            $scope.appointment_id = $stateParams.appointment_id;
        

        $scope.onezoneDatepicker = {
            //date: ($scope.date.getFullYear() + '-' + ($scope.date.getMonth()+1) + '-' + $scope.date.getUTCDate()), // MANDATORY                     
            mondayFirst: false,
            //months: months,                    
            //daysOfTheWeek: daysOfTheWeek,     
            //startDate: startDate,             
            //endDate: endDate,                    
            disablePastDays: false,
            disableSwipe: false,
            disableWeekend: false,
            //disableDates: disableDates,
            //disableDaysOfWeek: disableDaysOfWeek,
            showDatepicker: false, //allways visible
            showTodayButton: true,
            calendarMode: false, //only calendar, no button, click on the day call callback() function
            hideCancelButton: false,
            hideSetButton: false,
            //highlights: highlights,

            //format: "YYYY-MM-DD",           // date format

            callback: function (value) {

                value = $filter("date")(value, 'yyyy-MM-dd');
                $scope.dataAppo.date = value;
                
                //$scope.onezoneDatepicker.date = value;
                
                $scope.searchAppointments();
                $scope.searchTimes();
            }
        };
        
        $scope.appointments = [];
        $scope.searchAppointments = function () {
            
            localStorage.setItem('fechaTempApps', $scope.dataAppo.date);

            var params = {'barber_id': barber.Barber.id, 'fecha': $scope.dataAppo.date};
            
            $scope.show();
            Appointments.getBarberAppointments(params).then(function successCallback(result) {
                // this callback will be called asynchronously
                // when the response is available
                
                $scope.appointments = [];

                if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                    $scope.appointments = JSON.parse(JSON.stringify(result.data.response.data));

                    //console.log($scope.appointments);

                    $scope.hide();
                    
                   
                    if ($scope.appointments.length <= 0){

                        /*
                        $ionicPopup.alert({
                            //title: 'Info',
                            template: 'No appointments were found'
                        });
                        */
                    }else{

                        //console.log($scope.appointments);

                        for( var i = 0; i < $scope.appointments.length; i++ ){
                            //console.log( $scope.appointments[$i] );
                            
                            //console.log( i );
                            
                            //solo prueba
                            //if( i===0 )
                                //$scope.appointment_id = $scope.appointments[i].Appointment.id;

                            if( $scope.appointments[i].MobileUser.foto==null || 
                                  $scope.appointments[i].MobileUser.foto==''  )
                                $scope.appointments[i].MobileUser.foto = 'img/barbersnet/img_nouser.png';


                            if( $scope.appointments[i].Appointment.fecha!=null ){

                                var fecha = $scope.appointments[i].Appointment.fecha;
                                //$scope.appointment.Appointment.fecha = $filter("date")(new Date(fecha), 'EEEE, MMMM dd, yyyy');
                                $scope.appointments[i].Appointment.hora = $filter("date")(new Date(fecha), 'hh:mm a');

                            }
                        }
                        
                        //console.log( $scope.appointment_id );
                    }

                } else {

                    $scope.hide();
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'No appointments were found'
                    });
                }
                
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                
                $scope.hide();
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please verify your internet connection and try again'
                });
            });
        };
        
        
        $scope.searchTimes = function(){
            //var barber = JSON.parse(localStorage.getItem('Barber'));
            var params = {'barber_id': barber.Barber.id, 'fecha': $scope.dataAppo.date, 'hora': '' /*hora*/};

            //console.log( params );//return;
            $scope.show();
            Appointments.searchTimeAvailable(params).then(function successCallback(result) {

                $scope.hide();
                //console.log(result);
                $scope.timeList = [];

                if (result != null && result.data != null && result.data.response != null && result.data.response.data != null)
                    $scope.timeList = JSON.parse(JSON.stringify(result.data.response.data));
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                $scope.hide();
            });
        };
        
        
        if( $stateParams.fecha && $stateParams.fecha!=null && $stateParams.fecha!='' ){
            
            $scope.dataAppo.date = $stateParams.fecha;
            //$scope.searchAppointments();
        }
        
        /*
        $scope.$on("$ionicView.enter", function(event, data){
            // handle event
            console.log("State Params: ", data.stateParams);
            
            //$scope.searchAppointments();
        });
        */
        
        $scope.searchAppointments();
        $scope.searchTimes();
        
        $scope.removeAppointment = function (appointment_id) {
            
            $ionicPopup.show({

                template: '<input type="text" id="obsCancel" >',
                title: '<h3 class="dark">Please type the motives</h3>',
                scope: $scope,
                buttons: [
                  { text: 'Back' },
                  {
                    text: '<b>Send</b>',
                    type: 'button-positive',
                    onTap: function(e) {

                        var obsCancel = document.getElementById('obsCancel').value;
                        if( obsCancel && obsCancel!=null && obsCancel!='' ){

                            $ionicPopup.confirm({
                                //title: 'Info',
                                template: 'Are you sure you want to delete this appointment ?',
                                //default: 'cancel'
                            }).then(function (res) {

                                if (res) {

                                    //console.log('You are sure, service id: ' + service);

                                    var barber = JSON.parse(localStorage.getItem('Barber'));
                                    var params = {
                                        'barber_id': barber.Barber.id, 
                                        'appointment_id': appointment_id,/*$stateParams.appointment_id*/
                                        'enviadopor': 'barber',
                                        'observaciones': obsCancel
                                    };

                                    //console.log( params );

                                    //$ionicHistory.goBack();

                                    $scope.show();

                                    Appointments.deleteAppointment(params).then(function successCallback(result) {

                                        if (result != null && result.data != null && 
                                                result.data.response != null /*&& 
                                                result.data.response.data != null*/ ) {

                                            $scope.hide();

                                            var msg = "Appointment couldn't be deleted";

                                            if( result.data.response.message!=null && result.data.response.message!='' )
                                               msg = result.data.response.message;

                                            $ionicPopup.alert({
                                                //title: 'Info',
                                                template: msg
                                            }).then(function (res) {

                                                if( result.data.response.success==true ){
                                                    $ionicHistory.goBack();
                                                    $window.location.reload(true);
                                                }

                                            }); 

                                        } else {

                                            var msg = "Appointment couldn't be deleted";

                                            if( result.data.response.message!=null &&
                                                   result.data.response.message!='' )
                                               msg = result.data.response.message;

                                            $scope.hide();
                                            $ionicPopup.alert({
                                                //title: 'Info',
                                                template: msg
                                            });
                                        }
                                    }, function errorCallback(response) {
                                        // called asynchronously if an error occurs
                                        // or server returns response with an error status.

                                        $scope.hide();
                                        $ionicPopup.alert({
                                            //title: 'Info',
                                            template: 'Please verify your internet connection and try again'
                                        });
                                    });

                                } else {

                                    //console.log('You are not sure');

                                }
                            });
                            
                        }else{

                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'You must type the motive'
                            });
                            e.preventDefault();
                        }
                    }
                  }
                ]
            });
        };
        
        $scope.goToView = function (url) {
            //console.log('goToView ' + url);
                            
            $location.path(url);
        };
    })

    .controller('AppointmentDetailCtrl', function ($scope, Appointments, $stateParams,
         $ionicLoading, $filter, $ionicHistory, $ionicPopup, $window, $location) {

        //$ionicNavBarDelegate.showBackButton(true);
        //console.log('AppointmentDetailCtrl');
        
        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        var barber = JSON.parse(localStorage.getItem('Barber'));
        var params = {'barber_id': barber.Barber.id, 'appointment_id': $stateParams.appointment_id};

        $scope.currency = barber.Barber.currency;

        $scope.show();
        Appointments.getBarberAppointment(params).then(function successCallback(result) {

            //console.log(result);
            
            $scope.appointment = [];

            if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                $scope.appointment = JSON.parse(JSON.stringify(result.data.response.data));

                //console.log( $scope.appointment.Appointment.fecha );

                var fecha = $scope.appointment.Appointment.fecha;
                $scope.appointment.Appointment.fecha = $filter("date")(new Date(fecha), 'EEEE, MMMM dd, yyyy');
                $scope.appointment.Appointment.hora = $filter("date")(new Date(fecha), 'hh:mm a');

                if( $scope.appointment.MobileUser.foto==null || $scope.appointment.MobileUser.foto=='' )
                    $scope.appointment.MobileUser.foto = 'img/barbersnet/img_nouser.png';

                //console.log( $scope.appointment );


                //var splitFecha = $scope.appointment.Appointment.fecha.split(' ');
                //console.log( splitFecha );
                //$scope.appointment.Appointment.fecha = $filter("date")(new Date(splitFecha[0] + 'T' + splitFecha[1]), 'EEEE, MMMM dd, yyyy');
                //$scope.appointment.Appointment.hora = $filter("date")(new Date(splitFecha[0] + 'T' + splitFecha[1]), 'hh:mm a');

                //console.log( $scope.appointment.Appointment.fecha );

                $scope.hide();
                
            } else {
                 $scope.hide();
                //alert( 'No appointment found' );
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Appointment not found'
                });
            }
            
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
            $ionicPopup.alert({
                //title: 'Info',
                template: 'Please verify your internet connection and try again'
            });
        });


        $scope.removeAppointment = function (appointment_id) {

            $ionicPopup.show({

                template: '<input type="text" id="obsCancel" >',
                title: '<h3 class="dark">Please type the motives</h3>',
                scope: $scope,
                buttons: [
                  { text: 'Back' },
                  {
                    text: '<b>Send</b>',
                    type: 'button-positive',
                    onTap: function(e) {

                        var obsCancel = document.getElementById('obsCancel').value;
                        if( obsCancel && obsCancel!=null && obsCancel!='' ){

                            $ionicPopup.confirm({
                                //title: 'info',
                                template: 'Are you sure you want to delete this appointment ?',
                                //default: 'cancel'
                            }).then(function (res) {

                                if (res) {

                                    //console.log('You are sure, service id: ' + service);

                                    var barber = JSON.parse(localStorage.getItem('Barber'));
                                    var params = {
                                        'barber_id': barber.Barber.id,
                                        'appointment_id': appointment_id,/*$stateParams.appointment_id*/
                                        'enviadopor': 'barber',
                                        'observciones': obsCancel
                                    };

                                    //console.log( params );

                                    //$ionicHistory.goBack();

                                    $scope.show();

                                    Appointments.deleteAppointment(params).then(function successCallback(result) {

                                        if (result != null && result.data != null && 
                                                result.data.response != null /*&& 
                                                result.data.response.data != null*/ ) {

                                            $scope.hide();

                                            var msg = "Appointment couldn't be deleted";

                                            if( result.data.response.message!=null && result.data.response.message!='' )
                                               msg = result.data.response.message;

                                            $ionicPopup.alert({
                                                //title: 'Info',
                                                template: msg
                                            }).then(function (res) {

                                                if( result.data.response.success==true ){
                                                    $ionicHistory.goBack();
                                                    $window.location.reload(true);
                                                }
                                            }); 

                                        } else {

                                            var msg = "Appointment couldn't be deleted";

                                            if( result.data.response.message!=null &&
                                                   result.data.response.message!='' )
                                               msg = result.data.response.message;

                                            $scope.hide();
                                            $ionicPopup.alert({
                                                //title: 'Info',
                                                template: msg
                                            });
                                        }
                                    }, function errorCallback(response) {
                                        // called asynchronously if an error occurs
                                        // or server returns response with an error status.

                                        $scope.hide();
                                        $ionicPopup.alert({
                                            //title: 'Info',
                                            template: 'Please verify your internet connection and try again'
                                        });
                                    });

                                } else {

                                    //console.log('You are not sure');

                                }
                            });
                            
                        }else{

                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'You must type the motive'
                            });
                            e.preventDefault();
                        }
                    }
                  }
                ]
            });
        };
        
        $scope.goToView = function (url) {
                            
            $location.path(url);
        };
    })

    .controller('AppointmentAddCtrl', function ($scope, Services, Clients, $ionicLoading, 
        $ionicHistory, $filter, $ionicPopup, $window, Appointments, $stateParams, $location, $ionicFilterBar) {

        //$ionicNavBarDelegate.showBackButton(true);
        //$scope.places = [{name:'New York'}, {name: 'London'}, {name: 'Milan'}, {name:'Paris'}, {name:'Madrid'}, {name:'Oslo'}, {name:'Barranquilla'}];
        $scope.$on('$ionicView.enter', function() {                
        $scope.searchClients_2();
        });
       
        var today = new Date();
        today = new Date( today.getFullYear(), today.getMonth(), today.getDate() );
        
        
        var barber = JSON.parse(localStorage.getItem('Barber'));
        $scope.barberServices = localStorage.getItem('BarberServices');
        $scope.dataAppo = {
            //date: new Date(),
            //date: 'No date selected',
            date: $filter("date")(today, 'yyyy-MM-dd'),

            //mobile_user_id: '',
            walkin_client_id : barber.Barber.walkin_client_id,
            selectTime: [],
            selectServices: [],
            selectClients: {
                id: barber.Barber.walkin_client_id,
                foto: '',
                nombre: "Walk in Client"
            }
            ,
            observations: ''
        };
        console.log($scope.dataAppo);
        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };
        
        
        //console.log( $scope.barberServices.length );
        
        if( $scope.barberServices==null || $scope.barberServices=='' || $scope.barberServices=='null' || $scope.barberServices.length == 0){
            
            $scope.show();
            var params = {'barber_id': barber.Barber.id};
            
            Services.getBarberServices(params).then(function successCallback(result) {

                $scope.barberServices = [];

                $scope.hide();

                if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                    $scope.barberServices = JSON.parse(JSON.stringify(result.data.response.data));

                    localStorage.setItem('BarberServices', JSON.stringify(result.data.response.data));
                    
                    //console.log( $scope.barberServices );
                    //alert( $scope.barberServices.length + ' - ' + $scope.barberServices[0].Service.nombre );

                } else {

                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'No services were found'
                    });
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                $scope.hide();
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please verify your internet connection and try again'
                });
            });
            
        }else
            $scope.barberServices = JSON.parse($scope.barberServices);

        //$scope.data = [];

        //$scope.saveAppointment = function () {
        
        $scope.saveAppointment = function () {

            //console.log($scope.dataAppo);
            //console.log($scope.dataAppo.selectClients);
            //console.log($scope.data);

            if ((($scope.dataAppo != null) &&
                    $scope.dataAppo.selectServices != null && $scope.dataAppo.selectServices != '') &&
                    ($scope.dataAppo.date != null && $scope.dataAppo.date != '') &&
                //client id
                //($scope.dataAppo.mobile_user_id != null && $scope.dataAppo.mobile_user_id != '') &&
                        ($scope.dataAppo.selectClients != null && $scope.dataAppo.selectClients.id != '') &&
                        ($scope.dataAppo.selectTime != null && $scope.dataAppo.selectTime != '')) {

               
                $ionicPopup.confirm({
                    //title: 'Info',
                    template: 'Are you sure you want to save this appointment ?',
                    //default: 'cancel'
                }).then(function (res) {

                    if (res) {
                        
                        var accion = 'add';

                        $scope.data = {
                            fecha: $scope.dataAppo.date,
                            hora: $scope.dataAppo.selectTime,
                            //client_id: $scope.dataAppo.selectClients,
                            client_id: $scope.dataAppo.selectClients.id,
                            descuento: document.getElementById("descuento").value,
                            service_id: $scope.dataAppo.selectServices.id,
                            barber_id: barber.Barber.id,
                            observaciones: $scope.dataAppo.observations,
                            enviadopor: 'barber',
                            appointment_id : '',
                            accion: accion
                        };
                        
                        if( $scope.data.hora instanceof Object )
                            $scope.data.hora = $scope.data.hora.id;
                        
                        //if( $scope.tipocliente=='walkin' )
                            //$scope.data.client_id = document.getElementById("walkinclient").value;
                        //else //if( $scope.tipocliente=='search' )
                            //$scope.data.client_id = document.getElementById("selectClients").value;

                        //console.log($scope.data);return;

                        $scope.show();
                        Appointments.saveBarberAppointment($scope.data).then(function successCallback(result) {

                            //console.log(result);

                            $scope.hide();

                            if (result != null && result.data != null && result.data.response != null) {
                                //$scope.services = JSON.parse( JSON.stringify(result.data.response.data) );

                                if (result.data.response.success == true) {
                                    
                                    var msg = "Appointment successfully saved";
                                    if (result.data.response.message &&
                                            result.data.response.message!=null && 
                                                result.data.response.message!='')
                                        msg = result.data.response.message;

                                    $ionicPopup.alert({
                                        //title: 'Info',
                                        template: msg

                                    }).then(function (res) {
                                        //si se desea hacer alguna accion al darle click en el boton OK
                                        
                                        /*
                                        //var fechaTemp = localStorage.getItem('fechaTempApps');
                                        
                                        $ionicHistory.goBack();
                                        $window.location.reload(true);
                                        
                                        //localStorage.setItem('fechaTempApps', fechaTemp);
                                        */
                                        
                                        $ionicHistory.nextViewOptions({
                                            disableAnimate: true,
                                            disableBack: true,
                                            historyRoot: true
                                        });

                                        $location.path('/app/appointments');
                                    });

                                } else {

                                    var msg = "Appointment couldn't be saved";

                                    if ( result.data.response.message && 
                                            result.data.response.message != null && 
                                                result.data.response.message != '')
                                        msg = result.data.response.message;

                                    $ionicPopup.alert({
                                        //title: 'Info',
                                        template: msg
                                    });
                                }

                            } else {

                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: "Appointment couldn't be saved"
                                });
                            }
                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.

                            $scope.hide();
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'Please verify your internet connection and try again'
                            });
                        });
                    }
                });

            } else {
                //alert('Please fill data in the form');
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please fill data in the form'
                });
            }
        };
        
        
        $scope.onezoneDatepicker = {
            //date: ($scope.date.getFullYear() + '-' + ($scope.date.getMonth()+1) + '-' + $scope.date.getUTCDate()), // MANDATORY                     
            mondayFirst: false,
            //months: months,                    
            //daysOfTheWeek: daysOfTheWeek,     
            //startDate: startDate,             
            //endDate: endDate,                    
            disablePastDays: true,
            disableSwipe: false,
            disableWeekend: false,
            //disableDates: disableDates,
            //disableDaysOfWeek: disableDaysOfWeek,
            showDatepicker: false, //allways visible
            showTodayButton: true,
            calendarMode: false, //only calendar, no button, click on the day call callback() function
            hideCancelButton: false,
            hideSetButton: false,
            //highlights: highlights,

            //format: "YYYY-MM-DD",           // date format

            callback: function (value) {


                $scope.dataAppo.date = $filter("date")(value, 'yyyy-MM-dd');
                // your code
                //console.log(value);
                //$scope.date = value;
                //var fecha = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getUTCDate();
                //$scope.date = fecha;
                //$scope.dataAppo.date = fecha;
                //$scope.dataAppo.date = value;
                
                //console.log( Date.parse($scope.dataSelectedAppo.date) );
                //console.log( Date.parse($scope.dataAppo.date) );
                
                //if( Date.parse($scope.dataSelectedAppo.date)==Date.parse($scope.dataAppo.date) )
                    //$scope.dataSelectedAppo.time = '';
                
                //$scope.dataAppo.date = $filter("date")(fecha, 'yyyy-MM-d');

                //$("#date").val(fecha);
                //$scope.date = fecha;

                $scope.searchTime();
            }
        };
        
        //$scope.dataAppo.date = $filter("date")($scope.dataAppo.date, 'yyyy-MM-dd');

        //$scope.date = new Date();
        //$scope.date = ($scope.date.getFullYear() + '-' + ($scope.date.getMonth() + 1) + '-' + $scope.date.getUTCDate());

        $scope.searchTime = function () {

            //console.log( $scope );
            if ($scope.dataAppo.date != null && $scope.dataAppo.date != '') {

                $scope.show();
                
                var hora = '';
                var today = new Date();
                today = new Date( today.getFullYear(), today.getMonth(), today.getDate() );
                
                var fechaAppo = new Date($scope.dataAppo.date);
                fechaAppo = new Date( fechaAppo.getFullYear(), fechaAppo.getMonth(), fechaAppo.getDate() );
                
                if( today.getTime()==fechaAppo.getTime() || today.getTime()===fechaAppo.getTime() ){
                    
                    today = new Date();
                    hora = (today.getHours() + ':' + today.getMinutes());
                }
                
                var barber = JSON.parse(localStorage.getItem('Barber'));
                var params = {'barber_id': barber.Barber.id, 'fecha': $scope.dataAppo.date, 'hora': '' /*hora*/};
                
                //console.log( params );return;
                
                Appointments.searchTimeAvailable(params).then(function successCallback(result) {

                    //console.log(result);
                    $scope.timeList = [];
                    $scope.dataAppo.selectTime = '';

                    if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                        $scope.timeList = JSON.parse(JSON.stringify(result.data.response.data));

                        //console.log( $scope.timeList );

                        $scope.hide();
                        
                        
                        var horaConAmPm = '';
                        var splitHora = null;
                        
                        //console.log( $scope.dataSelectedAppo.date + ":" + $scope.dataSelectedAppo.time + " - " + $scope.dataAppo.date);
                        //console.log( $scope.dataSelectedAppo.time );
                        
                        { 
                            //if( $scope.hora!=null && $scope.hora!='' )
                            //if( $scope.dataSelectedAppo.time!=null && $scope.dataSelectedAppo.time!='' )
                            if( Date.parse($scope.dataSelectedAppo.date)==Date.parse($scope.dataAppo.date) )
                                splitHora = $scope.dataSelectedAppo.time.split(':');

                            if( splitHora!=null && splitHora.length>1 ){

                                //$scope.dataAppo.date = splitFecha[0];
                                var hora = splitHora[0];
                                var amPm = 'AM';
                                if( hora>12 ){
                                    hora -= 12;
                                    amPm = 'PM';
                                }

                                horaConAmPm = (hora + ":" + splitHora[1] + " " + amPm);
                            }
                        }
                        
                        //console.log( $scope.timeList );
                        
                        if ($scope.timeList == null || $scope.timeList.length <= 0) {

                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'No available times were found'
                            });
                            
                            if( splitHora!=null && splitHora.length>1 ){
                                
                                $scope.timeList = new Array();
                                
                                $scope.timeList[0] = {
                                        id: $scope.dataSelectedAppo.time,
                                        value: horaConAmPm
                                                    };
                                    
                                $scope.dataAppo.selectTime = $scope.timeList[0];
                            }

                        } else {
                            
                            //console.log( splitHora );
                            
                            if( splitHora!=null && splitHora.length>1 ){
                                
                                for( var i = 0; i < $scope.timeList.length; i++ ){

                                    if( $scope.timeList[i].id==$scope.dataSelectedAppo.time ){
                                        
                                        //$scope.timeList.selected = $scope.timeList[i];
                                        $scope.dataAppo.selectTime = $scope.timeList[i];
                                        break;
                                    }
                                }

                                //la hora seleccionada no está en las horas consultadas
                                if( i>=$scope.timeList.length ){

                                    for( var j = $scope.timeList.length; j > 0; j-- )
                                        $scope.timeList[j] = $scope.timeList[j-1];

                                    $scope.timeList[0] = {
                                            id: $scope.dataSelectedAppo.time,
                                            value: horaConAmPm
                                        };

                                    $scope.dataAppo.selectTime = $scope.timeList[0];
                                    
                                    $scope.openSelect("#selectTime");
                                }
                                
                            }else{
                                //$scope.dataAppo.selectTime = $scope.timeList[0];
                                $scope.dataAppo.selectTime = '';
                                $scope.openSelect("#selectTime");
                            }
                            
                            //console.log( $scope.dataAppo.selectTime );

                            /*
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: ('Time found: ' + $scope.timeList.length + '<br/>Please, choose one')
                            }).then(function (res) {

                                //$("#selectTime").focus();
                            });
                            */
                        }
                        
                        //console.log( $scope.timeList);
                        //console.log($scope.dataAppo.selectTime);

                    } else {

                        var msg = 'No available times were found';
                        if (result.data.response.message != null && result.data.response.message != '')
                            msg = result.data.response.message;

                        $scope.hide();
                        $ionicPopup.alert({
                            //title: 'Info',
                            template: msg
                        });
                    }
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    $scope.hide();
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'Please verify your internet connection and try again'
                    });
                });

            } else {

                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Choose an avalaible time'
                });
            }
        };
        
        $scope.client_fotourl = '';
        
        $scope.clearClientCriteria = function(id){
            //console.log( item );
            $scope.dataAppo.criteria = '';
            
            //console.log( $scope.clientList[document.getElementById(id).selectedIndex-1] );
            
            if( document.getElementById(id).selectedIndex>0 ){
            
                //console.log( $scope.clientList[document.getElementById(id).selectedIndex] );
                if( $scope.clientList[document.getElementById(id).selectedIndex-1].MobileUser.foto!=null &&
                        $scope.clientList[document.getElementById(id).selectedIndex-1].MobileUser.foto!='' )
                    $scope.client_fotourl = $scope.clientList[document.getElementById(id).selectedIndex-1].MobileUser.foto;
                else
                    $scope.client_fotourl = '';
                
            }else
                $scope.client_fotourl = '';
                
        };
        
        /*
        $scope.setSelectedService = function(sel){
            //$scope.dataAppo.selectedservice = ;
            console.log(sel.id);
        };
        */

        $scope.searchClients = function () {

            if( $scope.dataAppo.criteria != null && $scope.dataAppo.criteria != '' 
                    && $scope.dataAppo.criteria.length>1 ) {

                $scope.show();

                var barber = JSON.parse(localStorage.getItem('Barber'));
                var params = {'barber_id': barber.Barber.id, 'criteria': $scope.dataAppo.criteria};

                Clients.searchBarberClients(params).then(function succesCallback(result) {

                    //console.log(result);
                    $scope.clientList = [];
                    
                    $scope.hide();

                    if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {
                        
                        $scope.clientList = JSON.parse(JSON.stringify(result.data.response.data));
                        
                        //$scope.selectClients = JSON.parse(JSON.stringify(result.data.response.data));

                        //console.log( $scope.selectClients );

                        if ($scope.clientList == null || $scope.clientList.length <= 0) {

                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'No clients were found',
                                
                                buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.

                                    text: 'Cancel',
                                    type: 'button-default'
                                        
                                 }, {

                                    text: 'Add Client',
                                    type: 'button-positive',

                                    onTap: function(e) {

                                       //return $scope.data.response;
                                       $window.location.href = ('#/app/client-add');
                                    }
                                 }]
                                
                            });

                        } else {
                            
                            //console.log( "clientes encontrados" );
                            
                            $scope.openSelect("#selectClients");
                            /*
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: ('Clients found: ' + $scope.clientList.length + '<br/>Please, choose one')
                            }).then(function (res) {

                            });
                            */
                        }

                    } else {
                        
                        //alert( 'No clients found' );
                        $ionicPopup.alert({
                            //title: 'Info',
                            template: 'No clients were found'
                        });
                    }
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    $scope.hide();
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'Please verify your internet connection and try again'
                    });
                });

            } else {

                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Type a search criteria minimum with 2 characters'
                });
            }
        };
        
        $scope.searchClients_2 = function () {

            $scope.show();

            var barber = JSON.parse(localStorage.getItem('Barber'));
            var params = {'barber_id': barber.Barber.id, 'criteria': $scope.dataAppo.criteria};
            
            Clients.searchBarberClients(params).then(function succesCallback(result) {

                $scope.clientList = [];

                $scope.hide();

                if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                    $scope.clientList = JSON.parse(JSON.stringify(result.data.response.data));

                    //$scope.selectClients = JSON.parse(JSON.stringify(result.data.response.data));

                    //console.log( $scope.selectClients );

                    if ($scope.clientList == null || $scope.clientList.length <= 0) {

                        $ionicPopup.alert({
                            //title: 'Info',
                            template: 'No clients were found',

                            buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.

                                text: 'Cancel',
                                type: 'button-default'

                             }, {

                                text: 'Add Client',
                                type: 'button-positive',

                                onTap: function(e) {

                                   //return $scope.data.response;
                                   $window.location.href = ('#/app/client-add');
                                }
                             }]

                        });

                    } else {

                        //console.log( "clientes encontrados" );

                        $scope.openSelect("#selectClients");
                        /*
                        $ionicPopup.alert({
                            //title: 'Info',
                            template: ('Clients found: ' + $scope.clientList.length + '<br/>Please, choose one')
                        }).then(function (res) {

                        });
                        */
                    }

                } else {

                    //alert( 'No clients found' );
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'No clients were found'
                    });
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                $scope.hide();
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please verify your internet connection and try again'
                });
            });
        };
        
        
         $scope.showFilterBar = function () {
            document.getElementById('divClients').className ="div-on-top";
            document.getElementById('divSelectClient').className ="padding myPadding hide";
            var filterBarInstance = $ionicFilterBar.show({
              cancelText: "<i class='ion-ios-close-outline'></i>",
              items: $scope.clientList,
              update: function (filteredItems, filterText) {
                $scope.clientList = filteredItems;
                
              }
            });
          };
        /*
        $("#selectClients").on("blur", function() {
            $("#selectClients").attr("size", 1);
        });
        $("#selectClients").on("click", function() {
            $("#selectClients").attr("size", 1);
        });
        */
        
        $scope.show();

        //var barber = JSON.parse(localStorage.getItem('Barber'));
        var params = {'barber_id': barber.Barber.id};
        $scope.currency = barber.Barber.currency;
        
        //console.log( params );

        Clients.getBarberWalkInClient(params).then(function succesCallback(result) {

            //console.log(result);
            $scope.clientList = [];
            
            $scope.hide();

            if (result != null && result.data != null && result.data.response != null && 
                    result.data.response.data != null) {
                
                /*
                $scope.clientList = JSON.parse(JSON.stringify(result.data.response.data));

                $scope.selectedClient = $scope.clientList[0].MobileUser.id;
                //$("#selectClients").
                document.getElementById("selectClients").selectedIndex = 0;
                */
               
                var client = JSON.parse(JSON.stringify(result.data.response.data));
                
                document.getElementById("walkinclient").value = client[0].MobileUser.id;

            }
            
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
            /*
            $ionicPopup.alert({
                //title: 'Info',
                template: 'Please verify your internet connection and try again'
            });
            */
        });
        
        
        $scope.openSelect = function(selector){

            var element = $(selector)[0], worked = false;
            if (document.createEvent) { // all browsers
               var e = document.createEvent("MouseEvents");
               e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
               worked = element.dispatchEvent(e);
            } else if (element.fireEvent) { // ie
               worked = element.fireEvent("onmousedown");
            }
            if (!worked) { // unknown browser / error
               //alert("It didn't worked in your browser.");
            }   
        };
       
       
        $scope.tipocliente = 'walkin';
        $scope.setClientType = function(type) {
            $scope.tipocliente = type;
            
            if( type=='walkin' ){
                
                document.getElementById('divClients').className ="div-on-top hide";
                document.getElementById('divSelectClient').className ="padding myPadding";
                $scope.client_fotourl = '';
            }else if( type=='search' ){
                
                document.getElementById('divClients').style.visibility = 'visible';
                document.getElementById( 'selectClients' ).selectedIndex = 0;
            }
        };
        
        $scope.setClientInfo = function(type, data) {
            document.getElementById('divClients').className ="div-on-top hide";
            document.getElementById('divSelectClient').className ="padding myPadding";
            
            if( type=='walkin' ){
                $scope.dataAppo.selectClients.id = $scope.dataAppo.walkin_client_id;
                $scope.dataAppo.selectClients.nombre = 'Walk in Client';
                $scope.dataAppo.selectClients.foto = '';
            }else if( type=='search' ){
                $scope.dataAppo.selectClients.id = data.id;
                $scope.dataAppo.selectClients.nombre = data.nombre;
                $scope.dataAppo.selectClients.foto = 'img/barbersnet/img_nouser.png';
                if(data.foto != null && data.foto != "")
                    $scope.dataAppo.selectClients.foto = data.foto;
            }
        };
        
        $scope.isClient = function(type) {
            return type === $scope.tipocliente;
        };
        
        $scope.dataSelectedAppo = { date: '', time: '' };
        if( $stateParams.hora && $stateParams.hora!=null && $stateParams.hora!='' )
            $scope.dataSelectedAppo.time = $stateParams.hora;
        
        if( $stateParams.fecha && $stateParams.fecha!=null && $stateParams.fecha!='' )
            $scope.dataSelectedAppo.date = $stateParams.fecha;
        
        if( $scope.dataSelectedAppo.date!=null && $scope.dataSelectedAppo.date!='' )
            $scope.dataAppo.date = $scope.dataSelectedAppo.date;
            //$scope.searchTime();
        
        
        $scope.searchTime();
        
    })
    
    
    .controller('AppointmentEditCtrl', function ($scope, Services, Clients, $ionicLoading, 
        $ionicHistory, $filter, $ionicPopup, $window, $stateParams, $location, Appointments) {

        //$ionicNavBarDelegate.showBackButton(true);
        
        var appointment_id = '';
        
        if( $stateParams.appointment_id && $stateParams.appointment_id!=null && $stateParams.appointment_id!='' )
            appointment_id = $stateParams.appointment_id;
        
        $scope.dataAppo = {
            //date: new Date(),
            date: 'No date selected',
            date2: 'No date selected',
            
            descuento: 0,
            //descuento2: 0,

            //mobile_user_id: '',
            selectTime: [],
            selectServices: [],
            selectClients: [],
            observations: '',
            appointment_id: appointment_id
        };
        
        $scope.dataSelectedAppo = {
            //date: 'No date selected',

            //mobile_user_id: '',
            time: '',
            service_id: '',
            //client_id: '',
            //observations: '',
            //appointment_id: appointment_id
        };
        
        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };
        
        var barber = JSON.parse(localStorage.getItem('Barber'));
        var params = {'barber_id': barber.Barber.id, 'appointment_id': appointment_id};
        
        $scope.show();
        Appointments.getBarberAppointment(params).then(function successCallback(result) {

            //console.log(result);
            $scope.hide();
            
            $scope.appointment = [];

            if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                $scope.appointment = JSON.parse(JSON.stringify(result.data.response.data));

                //console.log( $scope.appointment.Appointment );
                //console.log( $scope.appointment );
                
                var fecha = $scope.appointment.Appointment.fecha;
                
                var splitFecha = fecha.split(' ');
                if( splitFecha!=null && splitFecha.length>1 ){
                    
                    $scope.dataAppo.date2 = splitFecha[0];
                    //$scope.dataAppo.date = splitFecha[0];
                    
                    var splitHora = splitFecha[1].split(':');
                    if( splitHora!=null && splitHora.length>1 )
                        $scope.dataSelectedAppo.time = (splitHora[0] + ':' + splitHora[1]);
                }
                
                //$scope.dataAppo.date = $scope.appointment.Appointment.fecha;
                
                $scope.appointment.Appointment.fecha = $filter("date")(new Date(fecha), 'EEEE, MMMM dd, yyyy');
                $scope.appointment.Appointment.hora = $filter("date")(new Date(fecha), 'hh:mm a');

                if( $scope.appointment.MobileUser.foto==null || $scope.appointment.MobileUser.foto=='' )
                    $scope.appointment.MobileUser.foto = 'img/barbersnet/img_nouser.png';
                
                
                //$scope.dataSelectedAppo.client_id = $scope.appointment.MobileUser.id;
                //$scope.dataSelectedAppo.service_id = { value: $scope.appointment.Service.id};
                $scope.dataSelectedAppo.service_id = $scope.appointment.Service.id;
                
                for( var i = 0; i < $scope.barberServices.length; i++ ){

                    if( $scope.barberServices[i].Service.id==$scope.dataSelectedAppo.service_id ||
                            $scope.barberServices[i].Service.id===$scope.dataSelectedAppo.service_id ){

                        $scope.dataAppo.selectServices = $scope.barberServices[i];
                        //$scope.dataAppo.selectServices = { 'Service': $scope.barberServices[i].Service };

                        //console.log( $scope.dataAppo.selectServices );

                        //$scope.selectServices =  { '0': { 'Service': $scope.appointment.MobileUser } };

                        break;
                    }
                }
                
                //$scope.dataSelectedAppo.time = $scope.appointment.Appointment.hora;
                
                //$scope.dataAppo.selectClients = $scope.appointment;
                
                $scope.dataAppo.observations = $scope.appointment.Appointment.observaciones;
                $scope.dataAppo.date = $scope.appointment.Appointment.fecha;
                
                try{
                    $scope.dataAppo.descuento = parseInt($scope.appointment.Appointment.descuento);
                }catch(e){}
                    
                
                //console.log( $scope.dataAppo.selectClients );
                
                /*
                $scope.clientList =  { '0': { 'MobileUser': $scope.appointment.MobileUser } };
                $scope.selectedClient = $scope.appointment.MobileUser;
                document.getElementById("selectClients").selectedIndex = 0;
                */
                $scope.client_fotourl = $scope.appointment.MobileUser.foto;
                $scope.clientnombre = $scope.appointment.MobileUser.nombre;
                
                $scope.searchTime();

                //var splitFecha = $scope.appointment.Appointment.fecha.split(' ');
                //console.log( splitFecha );
                //$scope.appointment.Appointment.fecha = $filter("date")(new Date(splitFecha[0] + 'T' + splitFecha[1]), 'EEEE, MMMM dd, yyyy');
                //$scope.appointment.Appointment.hora = $filter("date")(new Date(splitFecha[0] + 'T' + splitFecha[1]), 'hh:mm a');

                //console.log( $scope.appointment.Appointment.fecha );
                
            } else {
                //alert( 'No appointment found' );
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Appointment not found'
                });
            }
            
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
            $ionicPopup.alert({
                //title: 'Info',
                template: 'Please verify your internet connection and try again'
            });
        });
        
        //$scope.getService = function () {
            
        $scope.barberServices = localStorage.getItem('BarberServices');
        
        if( $scope.barberServices==null || $scope.barberServices=='' || $scope.barberServices=='null' ){
            
            $scope.show();
            Services.getBarberServices(params).then(function successCallback(result) {

                $scope.barberServices = [];

                $scope.hide();

                if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                    $scope.barberServices = JSON.parse(JSON.stringify(result.data.response.data));
                    
                    localStorage.setItem('BarberServices', JSON.stringify(result.data.response.data));

                    //console.log( $scope.barberServices );
                    //alert( $scope.barberServices.length + ' - ' + $scope.barberServices[0].Service.nombre );

                    for( var i = 0; i < $scope.barberServices.length; i++ ){

                        //console.log( $scope.barberServices[i].Service.id + ' - ' + $scope.dataSelectedAppo.service_id );

                        if( $scope.barberServices[i].Service.id==$scope.dataSelectedAppo.service_id ||
                                $scope.barberServices[i].Service.id===$scope.dataSelectedAppo.service_id ){
                            //$scope.barberServices.selected = $scope.barberServices[i];

                            //$scope.dataAppo.selectServices = $scope.barberServices[i].Service;
                            $scope.dataAppo.selectServices = $scope.barberServices[i];
                            //$scope.dataAppo.selectServices = { 'Service': $scope.barberServices[i].Service };

                            //console.log( $scope.dataAppo.selectServices );

                            //$scope.selectServices =  { '0': { 'Service': $scope.appointment.MobileUser } };

                            break;
                        }
                    }

                    //console.log($scope.barberServices.selected);

                    //document.getElementById('selectServices').selectedIndex = $scope.dataSelectedAppo.service_id;

                } else {
                    //alert( 'Not services found' );
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'No services were found'
                    });
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                $scope.hide();
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please verify your internet connection and try again'
                });
            });
        //};
        }else
            $scope.barberServices = JSON.parse($scope.barberServices);
            
            

        //$scope.data = [];

        $scope.saveAppointment = function () {

            //console.log($scope.dataAppo);
            //return;
            //console.log($scope.dataAppo.selectClients);
            //console.log($scope.data);
            
            if ((($scope.dataAppo != null) &&
                    $scope.dataAppo.selectServices != null && $scope.dataAppo.selectServices != '') &&
                    ($scope.dataAppo.date != null && $scope.dataAppo.date != '') &&
                //client id
                    //($scope.dataAppo.appointment_id != null && $scope.dataAppo.appointment_id != '') &&
                        (appointment_id!=null && appointment_id!='') &&
                        ($scope.dataAppo.selectClients != null && $scope.dataAppo.selectClients.id != '') &&
                        ($scope.dataAppo.selectTime != null && $scope.dataAppo.selectTime != '')) {
               
                $ionicPopup.confirm({
                    ////title: 'Alert',
                    template: 'Are you sure you want to modify this appointment ?',
                    //default: 'cancel'
                }).then(function (res) {

                    if (res) {
                        
                        //var accion = 'add';
                        //if( appointment_id!=null && appointment_id!='' )
                            var accion = 'edit';

                        $scope.data = {
                            fecha: $scope.dataAppo.date2,
                            //hora: $scope.dataAppo.selectTime,
                            hora: document.getElementById("selectTime").value,
                            //client_id: $scope.dataAppo.selectClients,
                            //client_id: document.getElementById("selectClients").value,
                            client_id:  $scope.appointment.MobileUser.id,
                            //service_id: $scope.dataAppo.selectServices.id,
                            service_id: document.getElementById("selectServices").value,
                            barber_id: barber.Barber.id,
                            observaciones: $scope.dataAppo.observations,
                            enviadopor: 'barber',
                            appointment_id : appointment_id,
                            accion: accion,
                            
                            descuento: document.getElementById("descuento").value
                            //descuento: $scope.dataAppo.descuento
                        };

                        //console.log($scope.data);
                        //return;

                        $scope.show();
                        Appointments.saveBarberAppointment($scope.data).then(function successCallback(result) {

                            //console.log(result);

                            $scope.hide();

                            if (result != null && result.data != null && result.data.response != null) {
                                //$scope.services = JSON.parse( JSON.stringify(result.data.response.data) );

                                if (result.data.response.success == true) {

                                    $ionicPopup.alert({
                                        //title: 'Info',
                                        template: "Appointment successfully saved"

                                    }).then(function (res) {

                                        /*
                                        $ionicHistory.goBack();
                                        $window.location.reload(true);
                                        */
                                       
                                       $ionicHistory.nextViewOptions({
                                            disableAnimate: true,
                                            disableBack: true,
                                            historyRoot: true
                                        });

                                        $location.path('/app/appointments');

                                    });

                                } else {

                                    var msg = "Appointment couldn't be saved";

                                    if (result.data.response.message != null && result.data.response.message != '')
                                        msg = result.data.response.message;

                                    $ionicPopup.alert({
                                        //title: 'Info',
                                        template: msg
                                    });
                                }

                            } else {

                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: "Appointment couldn't be saved"
                                });
                            }
                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.

                            $scope.hide();
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'Please verify your internet connection and try again'
                            });
                        });
                    }
                });

            } else {
                //alert('Please fill data in the form');
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please fill data in the form'
                });
            }
        };

        $scope.onezoneDatepicker = {
            //date: ($scope.date.getFullYear() + '-' + ($scope.date.getMonth()+1) + '-' + $scope.date.getUTCDate()), // MANDATORY                     
            mondayFirst: false,
            //months: months,                    
            //daysOfTheWeek: daysOfTheWeek,     
            //startDate: startDate,             
            //endDate: endDate,                    
            disablePastDays: true,
            disableSwipe: false,
            disableWeekend: false,
            //disableDates: disableDates,
            //disableDaysOfWeek: disableDaysOfWeek,
            showDatepicker: false, //allways visible
            showTodayButton: true,
            calendarMode: false, //only calendar, no button, click on the day call callback() function
            hideCancelButton: false,
            hideSetButton: false,
            //highlights: highlights,

            //format: "YYYY-MM-DD",           // date format

            callback: function (value) {


                value = $filter("date")(value, 'yyyy-MM-dd');
                // your code
                //console.log(value);
                //$scope.date = value;
                //var fecha = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getUTCDate();
                //$scope.date = fecha;
                //$scope.dataAppo.date = fecha;
                $scope.dataAppo.date = value;
                
                $scope.dataAppo.date2 = value;
                
                //console.log($scope.dataAppo.date2);

                //$scope.dataAppo.date = $filter("date")(fecha, 'yyyy-MM-d');

                //$("#date").val(fecha);
                //$scope.date = fecha;

                $scope.searchTime();
            }
        };

        //$scope.dataAppo.date = $filter("date")($scope.dataAppo.date, 'yyyy-MM-dd');

        //$scope.date = new Date();
        //$scope.date = ($scope.date.getFullYear() + '-' + ($scope.date.getMonth() + 1) + '-' + $scope.date.getUTCDate());

        $scope.searchTime = function () {

            //console.log( $scope );
            if ($scope.dataAppo.date != null && $scope.dataAppo.date != '') {

                $scope.show();
                
                var hora = '';
                var today = new Date();
                today = new Date( today.getFullYear(), today.getMonth(), today.getDate() );
                
                //var fechaAppo = new Date($scope.dataAppo.date);
                var fechaAppo = new Date($scope.dataAppo.date2);
                fechaAppo = new Date( fechaAppo.getFullYear(), fechaAppo.getMonth(), fechaAppo.getDate() );
                
                if( today.getTime()==fechaAppo.getTime() || today.getTime()===fechaAppo.getTime() ){
                    
                    today = new Date();
                    hora = (today.getHours() + ':' + today.getMinutes());
                }
                
                var barber = JSON.parse(localStorage.getItem('Barber'));
                var params = {'barber_id': barber.Barber.id, 'fecha': $scope.dataAppo.date2, 'hora': '' /*hora*/};

                //console.log(params);
                Appointments.searchTimeAvailable(params).then(function successCallback(result) {

                    //console.log(result);
                    $scope.timeList = [];

                    if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                        $scope.timeList = JSON.parse(JSON.stringify(result.data.response.data));

                        //console.log( $scope.timeList );
                        
                        var horaConAmPm = '';
                        {
                            var splitHora = $scope.dataSelectedAppo.time.split(':');
                            if( splitHora!=null && splitHora.length>1 ){

                                //$scope.dataAppo.date = splitFecha[0];
                                var hora = splitHora[0];
                                var amPm = 'AM';
                                if( hora>12 ){
                                    hora -= 12;
                                    amPm = 'PM';
                                }

                                horaConAmPm = (hora + ":" + splitHora[1] + " " + amPm);
                            }
                        }

                        $scope.hide();

                        if ($scope.timeList == null || $scope.timeList.length <= 0) {

                            /*
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'No available times were found'
                            });
                            */
                            
                            var splitHora = $scope.dataSelectedAppo.time.split(':');
                            if( splitHora!=null && splitHora.length>1 ){
                                
                                $scope.timeList = new Array();
                                
                                $scope.timeList[0] = {
                                        id: $scope.dataSelectedAppo.time,
                                        value: horaConAmPm
                                                    };
                                    
                                $scope.dataAppo.selectTime = $scope.timeList[0];
                                    
                            }

                        } else {

                            $scope.openSelect("#selectTime");
                            
                            for( var i = 0; i < $scope.timeList.length; i++ ){
                                
                                if( $scope.timeList[i].id==$scope.dataSelectedAppo.time ){
                                    //$scope.timeList.selected = $scope.timeList[i];
                                    $scope.dataAppo.selectTime = $scope.timeList[i];
                                    break;
                                }
                            }
                            
                            //la hora seleccionada no está en las horas consultadas
                            if( i>=$scope.timeList.length ){
                                
                                for( var j = $scope.timeList.length; j > 0; j-- )
                                    $scope.timeList[j] = $scope.timeList[j-1];
                                
                                $scope.timeList[0] = {
                                        id: $scope.dataSelectedAppo.time,
                                        value: horaConAmPm
                                    };

                                $scope.dataAppo.selectTime = $scope.timeList[0];
                            }
                            
                            /*
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: ('Time found: ' + $scope.timeList.length + '<br/>Please, choose one')
                            }).then(function (res) {

                                //$("#selectTime").focus();
                            });
                            */
                        }

                    } else {

                        var msg = 'No available times were found';
                        if ( result.data && result.data.response &&
                                result.data.response.message != null && result.data.response.message != '')
                            msg = result.data.response.message;

                        $scope.hide();
                        $ionicPopup.alert({
                            //title: 'Info',
                            template: msg
                        });
                    }
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    $scope.hide();
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'Please verify your internet connection and try again'
                    });
                });

            } else {

                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Choose an avalaible time'
                });
            }
        };
        
        $scope.clearClientCriteria = function(){
            //console.log( 'clearClientCriteria' );
            $scope.dataAppo.criteria = '';
        };
        
        /*
        $scope.setSelectedService = function(sel){
            //$scope.dataAppo.selectedservice = ;
            console.log(sel.id);
        };
        */

        $scope.searchClients = function () {

            if( $scope.dataAppo.criteria != null && $scope.dataAppo.criteria != '' 
                    && $scope.dataAppo.criteria.length>1 ) {

                $scope.show();

                var barber = JSON.parse(localStorage.getItem('Barber'));
                var params = {'barber_id': barber.Barber.id, 'criteria': $scope.dataAppo.criteria};

                Clients.searchBarberClients(params).then(function succesCallback(result) {

                    //console.log(result);
                    $scope.clientList = [];

                    if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {
                        $scope.clientList = JSON.parse(JSON.stringify(result.data.response.data));
                        
                        //$scope.selectClients = JSON.parse(JSON.stringify(result.data.response.data));

                        //console.log( $scope.selectClients );
                        //console.log( $scope.clientList );

                        $scope.hide();

                        if ($scope.clientList == null || $scope.clientList.length <= 0) {

                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'No clients were found',
                                
                                buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.

                                    text: 'Cancel',
                                    type: 'button-default'
                                        
                                 }, {

                                    text: 'Add Client',
                                    type: 'button-positive',

                                    onTap: function(e) {

                                       //return $scope.data.response;
                                       $window.location.href = ('#/app/client-add');
                                    }
                                 }]
                                
                            });

                        } else {
                            
                            $scope.openSelect("#selectClients");
                            /*
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: ('Clients found: ' + $scope.clientList.length + '<br/>Please, choose one')
                            }).then(function (res) {

                            });
                            */
                        }

                    } else {
                        
                        $scope.hide();
                        //alert( 'No clients found' );
                        $ionicPopup.alert({
                            //title: 'Info',
                            template: 'No clients were found'
                        });
                    }
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    $scope.hide();
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'Please verify your internet connection and try again'
                    });
                });

            } else {

                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Type a search criteria minimum with 2 characters'
                });
            }
        };
        
        /*
        $("#selectClients").on("blur", function() {
            $("#selectClients").attr("size", 1);
        });
        $("#selectClients").on("click", function() {
            $("#selectClients").attr("size", 1);
        });
        */
        
        
        $scope.currency = barber.Barber.currency;
        
        //console.log( params );
        /*
        $scope.show();

        //var barber = JSON.parse(localStorage.getItem('Barber'));
        var params = {'barber_id': barber.Barber.id};
        Clients.getBarberWalkInClient(params).then(function succesCallback(result) {

            //console.log(result);
            $scope.clientList = [];
            
            $scope.hide();

            if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {
                
                $scope.clientList = JSON.parse(JSON.stringify(result.data.response.data));

                $scope.selectedClient = $scope.clientList[0].MobileUser.id;
                
                
                //$("#selectClients").
                document.getElementById("selectClients").selectedIndex = 0;

                //console.log( $scope.selectedClient );


            }
            
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
        });
        */
        
        
        $scope.openSelect = function(selector){

            var element = $(selector)[0], worked = false;
            if (document.createEvent) { // all browsers
               var e = document.createEvent("MouseEvents");
               e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
               worked = element.dispatchEvent(e);
           } else if (element.fireEvent) { // ie
               worked = element.fireEvent("onmousedown");
           }
           if (!worked) { // unknown browser / error
               alert("It didn't worked in your browser.");
           }   
       };
        
    })


    .controller('BarberReportsCtrl', function ($scope, $filter, Barbers, $ionicLoading, $ionicPopup) {

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        
        var barber = JSON.parse(localStorage.getItem('Barber'));
        $scope.currency = barber.Barber.currency;

        //$scope.show();
        
        
        $scope.searchReport = function (time) {
            
            $scope.show();
            
            var params = {'barber_id': barber.Barber.id, 'tiempo': time, 'fecha': $scope.date};
            
            Barbers.getBarberReports(params).then(function successCllback(result) {

                $scope.barberReport = [];

                //console.log( result );
                $scope.hide();

                if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {
                    
                    $scope.barberReport = JSON.parse(JSON.stringify(result.data.response.data));

                } else {
                    
                    //alert( 'No appointment found' );
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'No data was found'
                    });
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                $scope.hide();
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please verify your internet connection and try again'
                });
            });
        };
        
        $scope.currency = barber.Barber.currency;

        $scope.nextSlide = function(index) {
            //$ionicSlideBoxDelegate.next();

            var action = '';

            switch( index ){

                case 0:{//today

                    action = 'day';

                }break;

                case 1:{//week

                    action = 'week';

                }break;

                case 2:{//month

                    action = 'month';

                }break;

                case 3:{//year

                    action = 'year';

                }break;

                default:
                    action = '';
            }
            
            
            $scope.searchReport( action );
            
            /*
            var barber = JSON.parse(localStorage.getItem('Barber'));
            var params = {'barber_id': barber.Barber.id, 'tiempo': action};

            

            $scope.show();
            Barbers.getBarberReports(params).then(function successCallback(result) {

                $scope.barberReport = [];

                //console.log( result );

                if (result != null && result.data != null && result.data.response != null 
                        && result.data.response.data != null) {
                    
                    $scope.barberReport = JSON.parse(JSON.stringify(result.data.response.data));

                    $scope.hide();

                } else {

                     $scope.hide();
                    //alert( 'No appointment found' );
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'No data was found'
                    });
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                $scope.hide();
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please verify your internet connection and try again'
                });
            });
            */

            //console.log('next: ' + index);
        };
        
        $scope.date = $filter("date")( (new Date()), 'yyyy-MM-dd');
        
        $scope.onezoneDatepicker = {
            //date: ($scope.date.getFullYear() + '-' + ($scope.date.getMonth()+1) + '-' + $scope.date.getUTCDate()), // MANDATORY                     
            mondayFirst: false,
            //months: months,                    
            //daysOfTheWeek: daysOfTheWeek,     
            //startDate: startDate,             
            //endDate: endDate,                    
            disablePastDays: false,
            disableSwipe: false,
            disableWeekend: false,
            //disableDates: disableDates,
            //disableDaysOfWeek: disableDaysOfWeek,
            showDatepicker: false, //allways visible
            showTodayButton: true,
            calendarMode: false, //only calendar, no button, click on the day call callback() function
            hideCancelButton: false,
            hideSetButton: false,
            //highlights: highlights,

            //format: "YYYY-MM-DD",           // date format

            callback: function (value) {

                $scope.date = $filter("date")(value, 'yyyy-MM-dd');
                $scope.nextSlide(0);

                //$scope.searchTime();
            }
        };
        
        $scope.nextSlide(0);
    })


    .controller('ClientsCtrl', function ($scope, Clients, $ionicLoading, $ionicFilterBar, $ionicPopup) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});



        //$ionicNavBarDelegate.showBackButton(false);

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };


        $scope.barber = JSON.parse(localStorage.getItem('Barber'));
        var params = {'barber_id': $scope.barber.Barber.id};

        $scope.show();
        Clients.getBarberClients(params).then(function successCallback(result) {

            //console.log(result);
            $scope.clients = [];

            if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {
                $scope.clients = JSON.parse(JSON.stringify(result.data.response.data));

                $scope.hide();
            } else {
                 $scope.hide();
                //alert( 'No clients found' );
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'No clients were found'
                });
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
            $ionicPopup.alert({
                //title: 'Info',
                template: 'Please verify your internet connection and try again'
            });
        });
        
        
        $scope.showFilterBar = function () {
            var filterBarInstance = $ionicFilterBar.show({
              cancelText: "<i class='ion-ios-close-outline'></i>",
              items: $scope.clients, //$scope.places,
              update: function (filteredItems, filterText) {
                $scope.clients = filteredItems;
              }
            });
        };
    })


    .controller('ClientAddCtrl', function ($scope, $ionicLoading, $ionicPopup, Clients, 
                $filter, $ionicHistory, $window, $cordovaContacts/*, $ionicNavBarDelegate, 
                $ionicPlatform, FlightDataService*/ ) {

        $scope.data = {
            birthday: 'No date selected',
            //nacimiento: 'No date selected',
            criteria: '',
            contacts: '',
            name : ''
        };

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        /*var ca = this;
        ca.*/$scope.saveClient = function () {
            
            //console.log( $scope.data );

            //alert( $scope.data.email + "\n" + $scope.data.name + "\n" + $scope.data.phone
            //      + "\n" + $scope.data.gender );

            if ( ($scope.data.name != null && $scope.data.name != '') &&
                    ($scope.data.email != null && $scope.data.email != '') &&
                    ($scope.data.phone != null && $scope.data.phone != '') &&
                    ($scope.data.gender != null && $scope.data.gender != '') //&&
                    
                    //($scope.data.nacimiento!=null && $scope.data.nacimiento!='' && 
                      // $scope.data.nacimiento!='No date selected' )
                    
                    //($scope.data.birthday!=null && $scope.data.birthday!='' && 
                       //$scope.data.birthday!='No date selected' )//&& 
                    //($scope.data.obs!=null && $scope.data.obs!='')
                    ) {
                
                $ionicPopup.confirm({
                    //title: 'Alert',
                    template: 'Are you sure you want to send the information ?'
                    //default: 'cancel'
                }).then(function (res) {

                    if (res) {

                        $scope.show();

                        var barber = JSON.parse(localStorage.getItem('Barber'));
                        $scope.data.barber_id = barber.Barber.id;

                        Clients.saveBarberClient($scope.data).then(function successCallback(result) {

                            //console.log(result);
                            //$scope.services = [];

                            if (result!=null && result.data!=null && result.data.response!=null) {//&&  result.data.response.data!=null){ 
                                //$scope.services = JSON.parse( JSON.stringify(result.data.response.data) );

                                $scope.hide();
                                //alert( result.data.response.message );

                                var msg = "Client couldn't be saved";

                                if( result.data.response.success==true )
                                   msg = "Client saved succesfully";
                                else
                                    msg = "Client couldn't be saved";

                                if( result.data.response.message!=null && result.data.response.message!='' )
                                   msg = result.data.response.message;

                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: msg
                                }).then(function (res2) {

                                    if( res2 ){

                                        if( result.data.response.success==true ){

                                            //$location.path('/app/login');
                                            //$ionicNavBarDelegate.back();
                                            $ionicHistory.goBack();
                                            $window.location.reload(true);
                                        }
                                    }
                                });

                            } else {

                                $scope.hide();
                                //alert( 'Not services found' );
                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: 'Client couldn´t be saved'
                                });
                            }
                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.

                            $scope.hide();
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'Please verify your internet connection and try again'
                            });
                        });
                    }
                });

            } else{
                //alert('Please fill data in the form');
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please fill all data marked with *'
                });
            }
        };

        /*
        $scope.onezoneDatepicker = {
            //date: ($scope.date.getFullYear() + '-' + ($scope.date.getMonth()+1) + '-' + $scope.date.getUTCDate()), // MANDATORY                     
            mondayFirst: false,
            //months: months,                    
            //daysOfTheWeek: daysOfTheWeek,     
            //startDate: startDate,             
            //endDate: endDate,                    
            disablePostDays: true,
            disableSwipe: false,
            disableWeekend: false,
            //disableDates: disableDates,
            //disableDaysOfWeek: disableDaysOfWeek,
            showDatepicker: false, //allways visible
            showTodayButton: true,
            calendarMode: false, //only calendar, no button, click on the day call callback() function
            hideCancelButton: false,
            hideSetButton: false,
            //highlights: highlights,

            //format: "YYYY-MM-DD",           // date format

            callback: function (value) {

                
                value = $filter("date")(value, 'yyyy-MM-dd');
                //$scope.data.birthday = value;
                
                $scope.data.nacimiento = value;
            }
        };
        */

        
        $scope.onezoneDatepicker = {
            //date: ($scope.date.getFullYear() + '-' + ($scope.date.getMonth()+1) + '-' + $scope.date.getUTCDate()), // MANDATORY                     
            mondayFirst: false,
            //months: months,                    
            //daysOfTheWeek: daysOfTheWeek,     
            //startDate: startDate,             
            //endDate: endDate,                    
            //disablePastDays: false,
            disableSwipe: false,
            disableWeekend: false,
            //disableDates: disableDates,
            //disableDaysOfWeek: disableDaysOfWeek,
            showDatepicker: false, //allways visible
            showTodayButton: true,
            calendarMode: false, //only calendar, no button, click on the day call callback() function
            hideCancelButton: false,
            hideSetButton: false,
            //highlights: highlights,
            //format: "YYYY-MM-DD",           // date format

            callback: function (value) {
                
                value = $filter("date")(value, 'yyyy-MM-dd');
                $scope.data.birthday = value;
                //$scope.data.nacimiento = value;
            }
        };
        

        $scope.searchContacts = function() {

            //console.log($scope.data.criteria);
            if( $scope.data.criteria!=null && $scope.data.criteria!='' ){

                $cordovaContacts.find({filter : $scope.data.criteria, fields:  [ 'id', 'displayName', 'emails', 'phoneNumbers', 'birthday' ]}).then(function(allContacts) {
                    //omitting parameter to .find() causes all contacts to be returned

                    $scope.data.contacts = allContacts;
                    
                    //console.log( $scope.data.contacts );
                    
                    for( var i = 0; i < $scope.data.contacts.length; i++ ){
                        
                        if( $scope.data.contacts[i].displayName==null || 
                                $scope.data.contacts[i].displayName=='' || 
                                $scope.data.contacts[i].displayName=="" ){
                            
                            $scope.data.contacts.splice(i, 1);
                        }
                    }

                    //console.log( $scope.data.contacts );
                    
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: ( $scope.data.contacts.length + ' contacts found, please choose one')
                    });
                });
                
            }else{
             
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Type the criteria for searching contacts'
                });
            }
        };
        
        var contacts;
        
        $scope.findContactsBySearchTerm = function() {
            
            var opts = {                                           //search options
              filter : $scope.data.criteria,                       // 'Bob'
              multiple: true,                                      // Yes, return any contact that matches criteria
              fields:  [ 'id', 'displayName', 'emails', 'phoneNumbers', 'birthday', 'name' ],                  // These are the fields to search for 'bob'.
              //desiredFields: [id]    //return fields.
            };
            
            //if ($ionicPlatform.isAndroid()) {
            if( ionic.Platform.isAndroid() ){
              opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
            }
            
            $cordovaContacts.find(opts).then(function (contactsFound) {
              
                contacts = contactsFound;
                $scope.data.contacts = contactsFound;
              
                for( var i = 0; i < $scope.data.contacts.length; i++ ){
                        
                    if( $scope.data.contacts[i].displayName==null || 
                            $scope.data.contacts[i].displayName=='' || 
                            $scope.data.contacts[i].displayName=="" ){

                        $scope.data.contacts.splice(i, 1);
                    }
                }
                
            });
        };
        
        $scope.pickContactUsingNativeUI = function () {
          $cordovaContacts.pickContact().then(function (contactPicked) {
            //$scope.data.contact = contactPicked;
            //console.log(contactPicked);
            
            $scope.data.name = '';
            $scope.data.phone = '';
            $scope.data.email = '';
            
            if( contactPicked.displayName!=null &&
                    contactPicked.displayName!='' && contactPicked.displayName!="" )
                $scope.data.name = contactPicked.displayName;
            else if( contactPicked.name!=null ){
              
                if( contactPicked.name.givenName!=null && contactPicked.name.givenName!='' )
                    $scope.data.name = contactPicked.name.givenName;
                else if( contactPicked.name.formatted!=null && contactPicked.name.formatted!='' )
                    $scope.data.name = contactPicked.name.formatted;
            } 
            
            if( contactPicked.phoneNumbers!=null && contactPicked.phoneNumbers.length>0 )
                $scope.data.phone = contactPicked.phoneNumbers[0].value;
            
            if( contactPicked.emails!=null && contactPicked.emails.length>0 )
                $scope.data.email = contactPicked.emails[0].value;
            
            //alert( contactPicked );
          });
        };

        $scope.chooseContact = function(){
            
            $scope.data.name = $scope.data.contacts;
            
            
            //console.log( $scope.data.contacts ); 
            
            //console.log( document.getElementById("selectContacts").selectedIndex );
            //console.log( document.getElementById("selectContacts") );
            
            var index = document.getElementById("selectContacts").selectedIndex;
            
            //var contact = $scope.data.contacts[index];
            //var contact2 = $scope.data.contacts.index;
            
            var contact = contacts[index];
            var contact2 = contacts.index;
            
            //console.log( contact );
            //console.log( contact2 );
            
            //$scope.data.name = contact.displayName;
            
            if( contact.emails!=null && contact.emails.length>0 )
                $scope.data.email = contact.emails[0].value;
            
            //if( contact.emails!=null && contact.emails.length>0 )
                //$scope.data.email = contact.emails[0];
            
        };
    })
    
    
    
    
    .controller('ClientEditCtrl', function ($scope, $ionicLoading, $ionicPopup, Clients, 
                $filter, $ionicHistory, $window, $stateParams
                /*, $ionicNavBarDelegate, $ionicPlatform, FlightDataService*/ ) {


        var barber = JSON.parse(localStorage.getItem('Barber'));
        //$scope.data.barber_id = barber.Barber.id;
        $scope.data = {
            barber_id: barber.Barber.id,
            mobile_user_id: '',
            birthday: 'No date selected',
            email: '',
            gender: '',
            name : '',
            phone: '',
            sexo: ''
        };

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        /*var ca = this;
        ca.*/$scope.saveClient = function () {
            
            if ( ($scope.data.name != null && $scope.data.name != '') &&
                    ($scope.data.email != null && $scope.data.email != '') &&
                    ($scope.data.phone != null && $scope.data.phone != '') &&
                    ($scope.data.gender != null && $scope.data.gender != '') //&&
                    
                    ) {
                
                $ionicPopup.confirm({
                    template: 'Are you sure you want to send the information ?'
                    //default: 'cancel'
                }).then(function (res) {

                    if (res) {

                        $scope.show();

                        
                        //$scope.data.mobile_user_id = $stateParams.mobile_user_id;

                        Clients.saveBarberClientEdit($scope.data).then(function successCallback(result) {

                            //console.log(result);
                            //$scope.services = [];

                            if (result!=null && result.data!=null && result.data.response!=null) {//&&  result.data.response.data!=null){ 
                                //$scope.services = JSON.parse( JSON.stringify(result.data.response.data) );

                                $scope.hide();
                                //alert( result.data.response.message );

                                var msg = "Client couldn't be saved";

                                if( result.data.response.success==true )
                                   msg = "Client saved succesfully";
                                else
                                    msg = "Client couldn't be saved";

                                if( result.data.response.message!=null && result.data.response.message!='' )
                                   msg = result.data.response.message;

                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: msg
                                }).then(function (res2) {

                                    if( res2 ){

                                        if( result.data.response.success==true ){

                                            //$location.path('/app/login');
                                            //$ionicNavBarDelegate.back();
                                            $ionicHistory.goBack();
                                            $window.location.reload(true);
                                        }
                                    }
                                });

                            } else {

                                $scope.hide();
                                //alert( 'Not services found' );
                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: 'Client couldn´t be saved'
                                });
                            }
                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.

                            $scope.hide();
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'Please verify your internet connection and try again'
                            });
                        });
                    }
                });

            } else{
                //alert('Please fill data in the form');
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please fill all data marked with *'
                });
            }
        };

        $scope.onezoneDatepicker = {
            //date: ($scope.date.getFullYear() + '-' + ($scope.date.getMonth()+1) + '-' + $scope.date.getUTCDate()), // MANDATORY                     
            mondayFirst: false,
            //months: months,                    
            //daysOfTheWeek: daysOfTheWeek,     
            //startDate: startDate,             
            //endDate: endDate,                    
            //disablePastDays: false,
            disableSwipe: false,
            disableWeekend: false,
            //disableDates: disableDates,
            //disableDaysOfWeek: disableDaysOfWeek,
            showDatepicker: false, //allways visible
            showTodayButton: true,
            calendarMode: false, //only calendar, no button, click on the day call callback() function
            hideCancelButton: false,
            hideSetButton: false,
            //highlights: highlights,
            //format: "YYYY-MM-DD",           // date format

            callback: function (value) {
                
                value = $filter("date")(value, 'yyyy-MM-dd');
                $scope.data.birthday = value;
                //$scope.data.nacimiento = value;
            }
        };
        
        
        $scope.barber = JSON.parse(localStorage.getItem('Barber'));
        //$stateParams.barber_id = $scope.barber.Barber.id;
        
        var params = {'barber_id': $scope.barber.Barber.id, 'mobile_user_id': $stateParams.client_id};

        Clients.getClient(params).then(function successCallback(result) {

            $scope.client = [];

            if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                $scope.client = JSON.parse(JSON.stringify(result.data.response.data));
                
                //console.log($scope.client);
                
                if( $scope.client!=null && $scope.client.MobileUser && $scope.client.MobileUser!=null ){
                    
                    $scope.data.mobile_user_id = $scope.client.MobileUser.id;
                    $scope.data.birthday = $scope.client.MobileUser.fechanacimiento;
                    $scope.data.email = $scope.client.MobileUser.email;
                    $scope.data.gender = $scope.client.MobileUser.sexo;
                    $scope.data.name = $scope.client.MobileUser.nombre;
                    $scope.data.phone = $scope.client.MobileUser.telefono;
                }
                
                $scope.hide();

            } else {
                 $scope.hide();
                //alert( 'No client found' );
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'No clients were found'
                });
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
            $ionicPopup.alert({
                //title: 'Info',
                template: 'Please verify your internet connection and try again'
            });
        });
    })
    

    .controller('ClientDetailCtrl', function ($scope, $ionicLoading, Clients, 
        $stateParams, $ionicPopup) {

        //console.log($scope);
        //console.log($stateParams);
        //console.log(Clients);
        //console.log(Clients);
        //$scope.client = Clients.get($stateParams.clientId);
        //$scope.client = $scope.clients[];

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        //$scope.data = {};

        $scope.show();

        $scope.barber = JSON.parse(localStorage.getItem('Barber'));
        $stateParams.barber_id = $scope.barber.Barber.id;

        Clients.getClient($stateParams).then(function successCallback(result) {

            $scope.client = [];

            if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                $scope.client = JSON.parse(JSON.stringify(result.data.response.data));
                $scope.hide();

            } else {
                 $scope.hide();
                //alert( 'No client found' );
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'No clients were found'
                });
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
            $ionicPopup.alert({
                //title: 'Info',
                template: 'Please verify your internet connection and try again'
            });
        });
    })
    
    
    .controller('ClientHistoryCtrl', function ($scope, $ionicLoading, Clients, 
        $stateParams, $ionicPopup, $filter) {

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        //$scope.data = {};

        $scope.show();

        //$stateParams.mobile_user_id
        
        var barber = JSON.parse(localStorage.getItem('Barber'));
        //console.log( barber );

        $scope.currency = barber.Barber.currency;
        $stateParams.barber_id = barber.Barber.id;
        
        //console.log( $stateParams );

        Clients.getClientHistory($stateParams).then(function successCallback(result) {
            
            //console.log( result );

            $scope.clientAppointments = [];

            if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                $scope.clientAppointments = JSON.parse(JSON.stringify(result.data.response.data));
                //console.log( $scope.clientAppointments );
                
                $scope.hide();
                
                if ($scope.clientAppointments.length <= 0){

                        $ionicPopup.alert({
                            //title: 'Info',
                            template: 'Client history not found'
                        });

                    }else{

                        //console.log($scope.clientAppointments);

                        for( var i = 0; i < $scope.clientAppointments.length; i++ ){
                            
                            if( $scope.clientAppointments[i].MobileUser.foto==null || 
                                  $scope.clientAppointments[i].MobileUser.foto==''  )
                                $scope.clientAppointments[i].MobileUser.foto = 'img/barbersnet/img_nouser.png';

                            if( $scope.clientAppointments[i].Appointment.fecha!=null ){

                                var fecha = $scope.clientAppointments[i].Appointment.fecha;
                                $scope.clientAppointments[i].Appointment.fecha = $filter("date")(new Date(fecha), 'EEEE, MMMM dd, yyyy');
                                $scope.clientAppointments[i].Appointment.hora = $filter("date")(new Date(fecha), 'hh:mm a');

                            }
                        }
                        
                        //console.log($scope.clientAppointments);
                    }

            } else {
                 $scope.hide();
                //alert( 'No client found' );
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Client history not found'
                });
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
            $ionicPopup.alert({
                //title: 'Info',
                template: 'Please verify your internet connection and try again'
            });
        });
    })


    .controller('ServicesCtrl', function ($scope, Services, $ionicLoading, 
        $ionicPopup, $ionicHistory, $window) {
        
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        // $scope.$on('$ionicView.enter', function(e) {
        //});

        //$ionicNavBarDelegate.showBackButton(false);

        $scope.show = function () {
            
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };


        var barber = JSON.parse(localStorage.getItem('Barber'));
        var params = {'barber_id': barber.Barber.id};

        $scope.currency = barber.Barber.currency;

        //console.log(params);
        
        $scope.services = localStorage.getItem('BarberServices');
        
        if( $scope.services==null || $scope.services=='' || $scope.services=='null' ){
            
            $scope.show();

            Services.getBarberServices(params).then(function successCallback(result) {

                //console.log( result );

                $scope.services = [];

                if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {
                    
                    $scope.services = JSON.parse(JSON.stringify(result.data.response.data));
                    
                    localStorage.setItem('BarberServices', JSON.stringify(result.data.response.data));

                    $scope.hide();

                    if ($scope.services == null || $scope.services.length <= 0) {

                        $ionicPopup.alert({
                            //title: 'Info',
                            template: 'No services were found'
                        });
                    }

                } else {
                    $scope.hide();
                    //alert( 'Not services found' );
                    $ionicPopup.alert({
                        //title: 'Info',
                        template: 'No services were found'
                    });
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                $scope.hide();
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please verify your internet connection and try again'
                });
            });
            
        }else
            $scope.services = JSON.parse($scope.services);


        $scope.removeService = function (service) {
           
            var confirmPopup = $ionicPopup.confirm({
                //title: 'Alert',
                template: 'Are you sure you want to delete this service ?',
                //default: 'cancel'
            });

            confirmPopup.then(function (res) {

                if (res) {

                    //$window.location.reload(true)

                    //console.log('You are sure, service id: ' + service);

                    var barber = JSON.parse(localStorage.getItem('Barber'));
                    var params = {'barber_id': barber.Barber.id, 'service_id': service};

                    $scope.show();

                    //console.log(params);

                    Services.deleteService(params).then(function successCallback(result) {

                        //console.log(result);

                        if (result != null && result.data != null && 
                                result.data.response != null ) {

                            $scope.hide();

                            var msg = "Service couldn't be deleted";

                            if( result.data.response.message!=null && result.data.response.message!='' )
                               msg = result.data.response.message;

                            $ionicPopup.alert({
                                //title: 'Info',
                                template: msg
                            }).then(function (res) {

                                if( result.data.response.success==true )
                                    //$ionicHistory.goBack();
                                    $window.location.reload(true)

                            });

                        } else {

                            var msg = "Service couldn't be deleted";

                            if( result.data.response.message!=null &&
                                   result.data.response.message!='' )
                               msg = result.data.response.message;

                            $scope.hide();
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: msg
                            });
                        }
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.

                        $scope.hide();
                        $ionicPopup.alert({
                            //title: 'Info',
                            template: 'Please verify your internet connection and try again'
                        });
                    });

                } else {

                    //console.log('You are not sure');


                }
            });
        };
    })


    .controller('ServicesAddCtrl', function ($scope, $ionicLoading, Services, 
        $ionicPopup, $ionicHistory, $window) {

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show();

        var barber = JSON.parse(localStorage.getItem('Barber'));
        var params = {'barber_id': barber.Barber.id};

        $scope.currency = barber.Barber.currency;

        Services.getAvailableServices(params).then(function successCallback(result) {

            $scope.allServices = [];

            if (result != null && result.data != null && result.data.response != null && result.data.response.data != null) {

                $scope.allServices = JSON.parse(JSON.stringify(result.data.response.data));
                //alert($scope.allServices.length);
                //$scope.$apply();

                //$scope.allServices = $scope.items[1];
                //no funciona
                //$scope.data.selectServices = { name: $scope.allServices[0].Service.nombre, id: $scope.allServices[0].Service.id };
                //$scope.$apply();

                $scope.hide();

                //alert( $scope.selectServices.name );

            } else {
                $scope.hide();
                //alert('No services found');
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'No services were found'
                });
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
            $ionicPopup.alert({
                //title: 'Info',
                template: 'Please verify your internet connection and try again'
            });
        });

        $scope.data = {};

        //var sc = this;
        //sc.saveService = function(){
        //Services.saveService = function(){
        $scope.saveService = function () {

            //alert('here');
            //alert($scope.data.precio + $scope.data.service);
            //alert( $scope.data.selectServices );

            //console.log( $scope );

            if ((($scope.data != null) &&
                    $scope.data.selectServices != null && $scope.data.selectServices != '') &&
                    ($scope.data.precio != null && $scope.data.precio != '') &&
                    ($scope.data.puntos != null && $scope.data.puntos != '')//&& 
                    //($scope.data.currency!=null && $scope.data.currency!='')
                    ) {

                //alert( $scope.data.selectServices + ' - ' + $scope.data.precio );

                $ionicPopup.confirm({
                    //title: 'Alert',
                    template: 'Are you sure you want to add this service ?',
                    //default: 'cancel'
                }).then(function (res) {

                    if (res) {

                        $scope.show();

                        var barber = JSON.parse(localStorage.getItem('Barber'));
                        $scope.data.barber_id = barber.Barber.id;
                        //var curr = ($scope.data.currency + '');
                        //$scope.data.currency = encodeURIComponent( curr.trim() );

                        $scope.data.service_id = $scope.data.selectServices;
                        $scope.data.accion = 'add';

                        //console.log($scope.data);
                        //return;

                        Services.saveBarberServices($scope.data).then(function successCallback(result) {

                            //console.log(result);
                            //$scope.services = [];

                            if (result != null && result.data != null && result.data.response != null) {//&&  result.data.response.data!=null){ 
                                //$scope.services = JSON.parse( JSON.stringify(result.data.response.data) );

                                $scope.hide();
                                //alert( result.data.response.message );

                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: result.data.response.message
                                }).then(function (res) {

                                    if( result.data.response.success==true ){
                                        
                                        $ionicHistory.goBack();
                                        $window.location.reload(true);
                                    }
                                });

                            } else {

                                $scope.hide();
                                //alert( 'Not services found' );
                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: 'Service couldn`t be saved'
                                });
                            }
                            
                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.

                            $scope.hide();
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'Please verify your internet connection and try again'
                            });
                        });
                    }
                });

            } else{
                //alert('Please fill data in the form');
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please fill all data in the form'
                });
            }
        };
    })


    .controller('ServicesEditCtrl', function ($scope, $ionicLoading, $stateParams, 
        Services, $ionicPopup, $ionicHistory, $window) {

        $scope.data = {
            titulo: '',
            puntos: '',
            service_id: $stateParams.service_id,
            precio: '',
            //linkdepago: ''
        };

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show();

        //console.log('here2');

        var barber = JSON.parse(localStorage.getItem('Barber'));
        var params = {'barber_id': barber.Barber.id, 'service_id': $stateParams.service_id};

        $scope.currency = barber.Barber.currency;

        //console.log('here3');


        Services.getService(params).then(function successCallback(result) {

            //console.log('here4');

            $scope.service = [];

            $scope.hide();

            if (result != null && result.data != null && result.data.response != null && 
                    result.data.response.data != null) {

                $scope.service = JSON.parse(JSON.stringify(result.data.response.data));

                //console.log( $scope.service );

                if( $scope.service!=null ){

                    //console.log( 'here' );

                    $scope.data.titulo = $scope.service.Service.titulo;
                    //$scope.data.linkdepago = $scope.service.Service.linkdepago;
                    $scope.data.puntos = parseInt($scope.service.Service.puntos);
                    //$scope.data.service_id = $scope.service.Service.id;
                    $scope.data.precio = parseInt($scope.service.Service.precio);

                    //$scope.$apply();
                }

            } else {
                $scope.hide();
                //alert('No services found');
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Service not found'
                });
            }
        }), function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
            $ionicPopup.alert({
                //title: 'Info',
                template: 'Please verify your internet connection and try again'
            });
        };

        $scope.saveService = function () {
            
            //console.log( $scope.data );return;

            if ( ($scope.data != null) &&
                    //$scope.data.service_id != null && $scope.data.service_id != '') &&
                    ($scope.data.precio != null && $scope.data.precio != '') &&
                    ($scope.data.puntos != null && $scope.data.puntos != '')//&& 
                    //($scope.data.currency!=null && $scope.data.currency!='')
                    ) {

                //alert( $scope.data.selectServices + ' - ' + $scope.data.precio );

                $ionicPopup.confirm({
                    //title: 'Alert',
                    template: 'Are you sure you want to edit this service ?',
                    //default: 'cancel'
                }).then(function (res) {

                    if (res) {

                        $scope.show();

                        var barber = JSON.parse(localStorage.getItem('Barber'));
                        $scope.data.barber_id = barber.Barber.id;

                        //var curr = ($scope.data.currency + '');
                        //$scope.data.currency = encodeURIComponent( curr.trim() );

                        //$scope.data.service_id = $stateParams.service_id;

                        $scope.data.accion = 'edit';

                        //console.log($scope.data);

                        Services.saveBarberServices($scope.data).then(function successCallback(result) {

                            //console.log(result);
                            //$scope.services = [];

                            if (result != null && result.data != null && result.data.response != null) {//&&  result.data.response.data!=null){ 
                                //$scope.services = JSON.parse( JSON.stringify(result.data.response.data) );

                                $scope.hide();
                                //alert( result.data.response.message );

                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: result.data.response.message
                                }).then(function (res) {

                                    if( result.data.response.success==true ){
                                        
                                        //var barber = JSON.parse(localStorage.getItem('Barber'));

                                        /*
                                        console.log( barber );
                                        console.log( barber.Barber.email );
                                        console.log( barber.Barber.foto_url );
                                        console.log( barber.Barber.nombre );
                                        */
                                        
                                        $ionicHistory.goBack();
                                        $window.location.reload(true);
                                        
                                        //$rootScope.barberEmail  = barber.Barber.email;
                                        //$rootScope.barberFoto   = barber.Barber.foto_url;
                                        //$rootScope.barberNombre = barber.Barber.nombre;
                                        
                                        //console.log($rootScope);
                                    }
                                });

                            } else {

                                $scope.hide();
                                //alert( 'Not services found' );
                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: 'Service couldn`t be saved'
                                });
                            }
                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.

                            $scope.hide();
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'Please verify your internet connection and try again'
                            });
                        });
                    }
                });

            } else{
                //alert('Please fill data in the form');
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please fill all data in the form'
                });
            }
        };
    })

    .controller('BarberProfileCtrl', function ($scope) {

        $scope.barber = JSON.parse(localStorage.getItem('Barber'));

        //console.log($scope.barber);

        $scope.barberData = {
            barber_id:  $scope.barber.Barber.id,
            foto: $scope.barber.Barber.foto_url,
            direccion:  $scope.barber.Barber.direccion,
            telefono:   $scope.barber.Barber.telefono,
            descripcion:    $scope.barber.Barber.descripcion,
            currency:   $scope.barber.Barber.currency,
            email:      $scope.barber.Barber.email,
            duracioncita:   parseInt($scope.barber.Barber.duracioncita),
            extensionfoto:  'jpg',
            paypalemail:    $scope.barber.Barber.paypalemail,
            impuestos:      parseInt($scope.barber.Barber.impuestos),
            codigoreferido: $scope.barber.Barber.codigoreferido,
            nombrebarberia: $scope.barber.Barber.nombrebarberia,
            
            latitud: $scope.barber.Barber.latitud,
            longitud: $scope.barber.Barber.longitud
        };
        
        if( ($scope.barber.Barber.foto_url!=null || $scope.barber.Barber.foto_url!==null)
                && ($scope.barber.Barber.foto_url!='' || $scope.barber.Barber.foto_url!=='') )
            //foto.src = $scope.barber.Barber.foto_url;
            $scope.barberData.foto = $scope.barber.Barber.foto_url;
        else
            $scope.barberData.foto = 'img/barbersnet/img_nouser.png';
            
        
        var code = '';
        if( $scope.barber.Barber!=null && $scope.barber.Barber.code!=null )
            code = $scope.barber.Barber.code;
        
        $scope.shareLinkBarbers = function(){
            window.plugins.socialsharing.share("Download BarbersNet Barber App and sign in using my code: " + code + "", null, null, 'https://play.google.com/store/apps/details?id=com.mobolapps.barbersnetbarber&hl=en');
        };
        
        $scope.shareLinkClients = function(){
            window.plugins.socialsharing.share("Download BarbersNet Client App and sign in using my code: " + code + " ", null, null, 'https://play.google.com/store/apps/details?id=com.mobolapps.barbersnetclient&hl=en');
        };
        
    })
    
    
    .controller('BarberProfileEditCtrl', function ( $scope, $filter, $ionicLoading, Barbers, ionicTimePicker,
        $ionicPopup, $ionicActionSheet, $ionicModal, $cordovaGeolocation, $ionicHistory, $window ){
        
        $scope.barber = JSON.parse(localStorage.getItem('Barber'));
        //console.log( $scope.barber );

        $scope.barberData = {
            barber_id:  $scope.barber.Barber.id,
            foto: '',
            direccion:  $scope.barber.Barber.direccion,
            telefono:   $scope.barber.Barber.telefono,
            descripcion:    $scope.barber.Barber.descripcion,
            currency:   $scope.barber.Barber.currency,
            email:      $scope.barber.Barber.email,
            duracioncita:   parseInt($scope.barber.Barber.duracioncita),
            extensionfoto:  'jpg',
            paypalemail:    $scope.barber.Barber.paypalemail,
            impuestos:      parseInt($scope.barber.Barber.impuestos),
            codigoreferido: $scope.barber.Barber.codigoreferido,
            nombrebarberia: $scope.barber.Barber.nombrebarberia,
            
            password: $scope.barber.Barber.password,
            
            latitud: $scope.barber.Barber.latitud,
            longitud: $scope.barber.Barber.longitud,
            
            horario: '',
            walkin_client_id: ''
        };
        
        $scope.geolocalizado = false;
        
        if( $scope.barberData.latitud && $scope.barberData.longitud &&
                $scope.barberData.latitud!=0 && $scope.barberData.longitud!=0 )
            $scope.geolocalizado = true;
        
        
        //console.log($scope.barber.Barber.foto_url);
        //var foto = document.getElementById('foto');
        $scope.fotobarbero = 'img/barbersnet/img_nouser.png';
        if( ($scope.barber.Barber.foto_url!=null || $scope.barber.Barber.foto_url!==null)
                && ($scope.barber.Barber.foto_url!='' || $scope.barber.Barber.foto_url!=='') )
            //foto.src = $scope.barber.Barber.foto_url;
            $scope.fotobarbero = $scope.barber.Barber.foto_url;
        //else
            //foto.src = 'img/img_nouser.png';
        
        //console.log( 'foto: ' + $scope.barberData.foto );
        

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };
        
        var params = { 'barber_id': $scope.barber.Barber.id };
        //console.log(params );
        Barbers.getBarberHorario(params).then(function successCallback(result) {

            //console.log(result );

            $scope.hide();
            
            if (result!= null && result.data!= null && result.data.response != null) {
                //$scope.services = JSON.parse( JSON.stringify(result.data.response.data) );

                if (result.data.response.success==true &&
                        result.data.response.data && result.data.response.data!=null ){
                    
                    $scope.barberData.horario = result.data.response.data.Schedule;
                    
                    /*
                    console.log( $scope.barberData.horario.lunes );
                    
                    //$scope.barberData.horario.lunes.inicio = $filter("date")(new Date (new Date().toDateString() + ' ' + $scope.barberData.horario.lunes.inicio), 'hh:mm a');
                    //$scope.barberData.horario.lunes.fin = $filter("date")(new Date (new Date().toDateString() + ' ' + $scope.barberData.horario.lunes.fin), 'hh:mm a');
                    
                    //$scope.barberData.horario.lunes.inicio = new Date(new Date().toDateString() + ' ' + $scope.barberData.horario.lunes.inicio);
                    //$scope.barberData.horario.lunes.fin = new Date (new Date().toDateString() + ' ' + $scope.barberData.horario.lunes.fin);
                    
                    $scope.barberData.horario.lunes.inicio = new Date(new Date().toDateString() + ' ' + $scope.barberData.horario.lunes.inicio);
                    $scope.barberData.horario.lunes.fin = new Date (new Date().toDateString() + ' ' + $scope.barberData.horario.lunes.fin);
                    
                    
                    console.log( $scope.barberData.horario.lunes );
                    */
                    
                    /*
                    //para cuando se usa <input type="time">
                    var dias = [ 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo' ];
                    var tipos = [ 'inicio', 'fin' ];

                    for(var i = 0; i < dias.length; i++){

                        for(var j = 0; j < tipos.length; j++){

                            try{
                                
                                if( $scope.barberData.horario[dias[i]][tipos[j]] )
                                    $scope.barberData.horario[dias[i]][tipos[j]] = new Date(new Date().toDateString() + ' ' + $scope.barberData.horario[dias[i]][tipos[j]]);
                                else{
                                    console.log( dias[i] + "-" + tipos[j] );
                                    $scope.barberData.horario[dias[i]][tipos[j]] = "";
                                }

                            }catch(e){}
                        }
                    }
                    */
                    
                    //console.log($scope.barberData.horario);
                }
                
                //console.log( $scope.barberData.horario );

            }
            
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $scope.hide();
        });
        

        //console.log($scope.barberData);

        $scope.opcionesFoto = function() {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: 'Take snapshot'
                }, {
                    text: 'Upload file'
                }],
                titleText: 'Photo options',
                cancelText: 'Cancel',
                buttonClicked: function(index) {

                    if (index == 0) {
                        $scope.tomarFoto();
                        return true;
                    } else if (index == 1) {
                        $scope.cargarFoto();
                        return true;
                    }
                }
            });
        };

        $scope.tomarFoto = function() {
            var options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 500,
                sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                encodingType: 0 // 0=JPG 1=PNG $scope.response = JSON.stringify(res.data);
                
                ,allowEdit : true
                ,correctOrientation: true
            };
            navigator.camera.getPicture(onSuccess, onFail, options);
        };

        $scope.cargarFoto = function() {
            
            var options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 500,
                sourceType: 0, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                encodingType: 0 // 0=JPG 1=PNG $scope.response = JSON.stringify(res.data);
                
                ,allowEdit : true
                ,correctOrientation: true
            };
            
            navigator.camera.getPicture(onSuccess, onFail, options);
        };
        
        
        var onSuccess = function(DATA_URL) {
            
            $scope.barberData.foto = DATA_URL;
            //$scope.fotobarbero = 
            
            imgFoto.src = ("data:image/jpeg;base64," + $scope.barberData.foto); 
            
            $scope.fotobarbero = ("data:image/jpeg;base64," + $scope.barberData.foto); 
            
            imgFoto.onload();

            $scope.$apply();
        };
        
        var onFail = function(e) {
            console.log("On fail " + e);
        };
        
        
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        
        var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(0, "black");
        my_gradient.addColorStop(1, "white");
        ctx.fillStyle = my_gradient;
        ctx.fillRect(20, 20, 200, 200);
        
        
        var imgFoto = document.getElementById("foto");
        imgFoto.onload = function(){

            canvas.height = imgFoto.height;
            canvas.width = imgFoto.width;
            ctx.drawImage(imgFoto, 0, 0, imgFoto.width, imgFoto.height);
        };
        
        imgFoto.src = $scope.fotobarbero;//$rootScope.barberFoto;
        imgFoto.onload();
        
       
        $scope.rotateImage = function() {
            
            ctx.translate(imgFoto.height, 0);
            
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(imgFoto, 0, 0, imgFoto.width, imgFoto.height);

            $scope.barberData.foto = (canvas.toDataURL());
            
            imgFoto.src = $scope.barberData.foto;
            
            if( $scope.barberData.foto.indexOf('png') > -1 ){
                
                $scope.barberData.extensionfoto = 'png';
                $scope.barberData.foto = $scope.barberData.foto.replace("data:image/png;base64,", "");
                
            }else if( $scope.barberData.foto.indexOf('jpeg')>-1 || 
                        $scope.barberData.foto.indexOf('jpg')>-1 ){
                
                $scope.barberData.extensionfoto = 'jpg';
                $scope.barberData.foto = $scope.barberData.foto.replace("data:image/jpeg;base64,", "");
            }
            
            $scope.apply();
        };
        
        $scope.saveBarberProfile = function () {
            
            /*
            var dias = [ 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo' ];
            var tipos = [ 'inicio', 'fin' ];

            for(var i = 0; i < dias.length; i++){
                
                for(var j = 0; j < tipos.length; j++){
                    
                    try{
                        var hora = $scope.barberData.horario[dias[i]][tipos[j]];
                        if( hora && hora!=null && hora!='' && hora!='undefined' && hora!=undefined )
                            $scope.barberData.horario[dias[i]][tipos[j]] = $filter("date")(hora, 'hh:mm');
                        else
                            $scope.barberData.horario[dias[i]][tipos[j]] = "0";
                        
                    }catch(e){ 
                        //$scope.barberData.horario[dias[i]][tipos[j]] = "0";
                    }
                }
            }
            */
            
            //$scope.barberData.horario.lunes.inicio = $filter("date")($scope.barberData.horario.lunes.inicio, 'hh:mm');

            //console.log($scope.barberData);return;

            if( $scope.barberData != null &&
                //( $scope.barberData.foto!=null && $scope.barberData.foto!='' ) &&
                ( $scope.barberData.direccion != null && $scope.barberData.direccion != '' ) &&
                ( $scope.barberData.telefono != null && $scope.barberData.telefono != '' ) &&
                ( $scope.barberData.email != null && $scope.barberData.email != '' ) &&
                ( $scope.barberData.currency != null && $scope.barberData.currency != '' ) &&
                ( $scope.barberData.duracioncita != null && $scope.barberData.duracioncita != '' )){

                $ionicPopup.confirm({
                    //title: 'Info',
                    template: 'Are you sure you want to send this information ?'
                    //default: 'cancel'
                }).then(function (res1) {

                    if (res1) {

                        //console.log($scope.barberData);

                        $scope.show();
                        
                        $scope.barberData2 = $scope.barberData;
                        
                        if( $scope.actualizarHorario==false )
                            $scope.barberData2.horario = null;
                        
                        //console.log($scope.barberData2);//return;

                        Barbers.saveBarberEditProfile($scope.barberData2).then(function successCallback(result) {

                            //console.log(result);

                            $scope.hide();

                            if (result!=null && result.data!=null && 
                                    result.data.response && result.data.response!=null) {
                                //$scope.services = JSON.parse( JSON.stringify(result.data.response.data) );

                                if (result.data.response.success == true) {

                                    var msg = "Barber profile successfully modified";
                                    if( result.data.response.message!=null &&
                                            result.data.response.message!='' )
                                        msg = result.data.response.message;

                                    $ionicPopup.alert({
                                        //title: 'Info',
                                        template: msg

                                    }).then(function (res2) {
                                        //si se desea hacer alguna accion al darle click en el boton OK
                                        
                                        if( result.data.response.data && 
                                                result.data.response.data!=null ){
                                            
                                            try{
                                                localStorage.setItem('Barber', JSON.stringify(result.data.response.data));
                                            }catch(e){}
                                        }
                                        
                                        $ionicHistory.goBack();
                                        $window.location.reload(true);
                                        
                                    });

                                } else {

                                    var msg = "Profile couldn't be saved";

                                    if ( result.data.response.message!=null && result.data.response.message!='' )
                                        msg = result.data.response.message;

                                    $ionicPopup.alert({
                                        //title: 'Info',
                                        template: msg
                                    });
                                }

                            } else {

                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: "Profile couldn't be saved"
                                });
                            }
                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.

                            $scope.hide();
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'Please verify your internet connection and try again'
                            });
                        });
                    }
                });

            } else {
                //alert('Please fill data in the form');
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please fill data in the form'
                });
            }
        };
        
        $scope.marker = new google.maps.Marker();
        
        $scope.abirPopup = function (tipo) { 
            
            //console.log( 'abirPopup' );
            
            $ionicModal.fromTemplateUrl('modalPopup' + tipo + '.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                
                $scope.modal = modal;
                $scope.modal.show();
                
                //console.log( 'abirPopup modal' );
                
                if( tipo=='Location' ){
                
                    document.getElementById( 'divPopup' ).style.width = (window.screen.width + "px");
                    document.getElementById( 'divPopup' ).style.height = ((window.screen.height-50) + "px");

                    //$scope.mapCreated( document.getElementById('map') );

                    $scope.initializeMapa();
                    //$scope.centerOn('me');
                    
                }else{
                    $scope.actualizarHorario = true;
                    
                    
                    var dias = [ 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo' ];
                    var tipos = [ 'inicio', 'fin' ];

                    for(var i = 0; i < dias.length; i++){

                        for(var j = 0; j < tipos.length; j++){

                            try{

                                if( $scope.barberData.horario[dias[i]][tipos[j]] && 
                                        $scope.barberData.horario[dias[i]][tipos[j]]!=null &&
                                        $scope.barberData.horario[dias[i]][tipos[j]]!='' ){

                                    //$scope.chks[dias[i]] = 'enabled';
                                    //break;
                                    document.getElementById(dias[i] + tipos[j]).disabled = false;
                                    document.getElementById("chk" + dias[i]).checked = false;
                                    $scope.chks[dias[i]] = false;
                                    
                                }else{
                                    document.getElementById(dias[i] + tipos[j]).disabled = true;
                                    document.getElementById("chk" + dias[i]).checked = true;
                                    $scope.chks[dias[i]] = true;
                                }

                            }catch(e){ 
                                //$scope.barberData.horario[dias[i]][tipos[j]] = "0";
                            }
                        }
                    }
                    
                }
            });
        };
        
        $scope.initializeMapa = function(){
            
            //console.log( $scope.barberData.latitud + " , " + $scope.barberData.longitud );
            
            if( $scope.barberData.latitud && $scope.barberData.longitud &&
                    $scope.barberData.latitud!=0 && $scope.barberData.longitud!=0){
                
                var latLng = new google.maps.LatLng($scope.barberData.latitud, $scope.barberData.longitud);
                
                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                
                $scope.map = new google.maps.Map(document.getElementById("divPopup"), mapOptions);
                
                createMarker(latLng);
                
                google.maps.event.addListener($scope.map, 'click', function (e) {                                
                    createMarker(e.latLng);                                
                });
                
            }else{
            
            
                var options = {timeout: 10000, enableHighAccuracy: true};

                $cordovaGeolocation.getCurrentPosition(options).then(function(position){

                    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                    var mapOptions = {
                        center: latLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    $scope.map = new google.maps.Map(document.getElementById("divPopup"), mapOptions);

                    google.maps.event.addListener($scope.map, 'click', function (e) {                                
                        createMarker(e.latLng);                                
                    });

                }, function(error){
                  console.log("Could not get location");
                });
            }
        };
        
        var createMarker = function (latLng){
            
            $scope.barberData.latitud = latLng.lat(); //latitud
            $scope.barberData.longitud = latLng.lng(); //longitud 
            
            $scope.marker.setMap(null);
            if(!$scope.geolocalizado){
                
                $scope.marker = new google.maps.Marker({
                    position: latLng,
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    icon: 'img/barbersnet/barbershop_marker.png'
                });
                
            }else{
                 var m = new google.maps.Marker({
                    position: latLng,
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    icon: 'img/barbersnet/barbershop_marker.png'
                });
                $scope.marker = m;
            }
            $scope.geolocalizado =  true;
        };
        
        $scope.actualizarHorario = false;
        
        $scope.closeModal = function (){
            //modal.remove();

            //$scope.barberData.latitud = document.getElementById("latitud").value;
            //$scope.barberData.longitud = document.getElementById("longitud").value;
            
            //console.log( $scope.barberData.latitud + " , " + $scope.barberData.longitud );
            
            //$scope.geolocalizado = true;
            $scope.actualizarHorario = true;
            
            $scope.modal.remove();
        };
       
        
        $scope.displayTimePicker = function (day, tipo){
            
            //ionicTimePicker.openTimePicker(showTimerPicker);
            //console.log( day + " - " + tipo );
            
            var horario = $scope.barberData.horario[day][tipo];
            var hora = 0, minuto = 0; 
            
            var splitHora = horario.split(':');
            if( splitHora!=null && splitHora.length>1 ){
                hora = (splitHora[0]);
                minuto = (splitHora[1]);
            }
            
            ionicTimePicker.openTimePicker(
                
                {
                    callback: function (val) {      //Mandatory
                        if (typeof (val) === 'undefined') {
                            console.log('Time not selected');
                        } else {
                            var selectedTime = new Date(val * 1000);
                            //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                           // time_day = (selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes());
                            
                            $scope.barberData.horario[day][tipo] = (selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes());
                            
//$scope.barberData.horario[day][tipo] = (selectedTime.getHours() + ':' + selectedTime.getMinutes() );
                            //$scope.barberData.horario[day][tipo] = (selectedTime);
                            //console.log($scope.barberData.horario);
                        }
                    },
                    //inputTime: 50400, //Optional
                    inputTime: ((hora * 60 * 60) + (minuto * 60)),
                    format: 24, //Optional
                    //step: $scope.barberData.duracioncita,//15, //Optional
                    step: 1,
                    setLabel: 'Set'    //Optional
                }
            );
        };
        
        /*
        $scope.chks = { lunes: 'disabled', martes: 'disabled', miercoles: 'disabled', jueves: 'disabled', 
                        viernes: 'disabled', sabado: 'disabled', domingo: 'disabled'};
                    */
                    
        $scope.chks = { lunes: false, martes: false, miercoles: false, jueves: false, 
            viernes: false, sabado: false, domingo: false};
                    
                    
        //console.log($scope.chks);
        $scope.disableDay = function (day){
            
            if( $scope.chks[day]==false ){
                
                $scope.chks[day] = true;
                
                $scope.barberData.horario[day]['inicio'] = "0";
                $scope.barberData.horario[day]['fin'] = "0";
                
                //document.getElementById(day + "inicio").enabled = 'enabled';
                //document.getElementById(day + "fin").enabled = 'enabled';
                
            }else{
                //enable = 'disabled';
                $scope.chks[day] = false;
                
                //document.getElementById(day + "inicio").disabled = 'disabled';
                //document.getElementById(day + "fin").disabled = 'disabled';
            }
            
            document.getElementById(day + "inicio").disabled = $scope.chks[day];
            document.getElementById(day + "fin").disabled = $scope.chks[day];
        };
        
    })
    
    
    .controller('BarberAddCtrl', function ($scope, $ionicLoading, Barbers,
            $ionicPopup, $ionicActionSheet, $ionicHistory, $location) {


        $scope.barberData = {
            //barber_id: $scope.barber.Barber.id,
            foto: '',
            direccion: '',
            telefono: '',
            currency: '',
            email: '',
            duracioncita: '',
            descripcion: '',
            extensionfoto: 'jpg',
            referredcode: ''
        };

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        //console.log($scope.barberData);

        $scope.opcionesFoto = function() {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: 'Take snapshot'
                }, {
                    text: 'Upload file'
                }],
                titleText: 'Photo options',
                cancelText: 'Cancel',
                
                buttonClicked: function(index) {

                    if (index==0){
                        
                        $scope.tomarFoto();
                        return true;
                        
                    } else if(index==1){
                        
                        $scope.cargarFoto();
                        return true;
                    }
                }
            });
        };

        $scope.tomarFoto = function() {
            var options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 500,
                sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                encodingType: 0 // 0=JPG 1=PNG $scope.response = JSON.stringify(res.data);
                
                ,allowEdit : true
                ,correctOrientation: true
            };
            navigator.camera.getPicture(onSuccess, onFail, options);
        };

        $scope.cargarFoto = function() {
            
            var options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 500,
                sourceType: 0, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                encodingType: 0 // 0=JPG 1=PNG $scope.response = JSON.stringify(res.data);
                
                ,allowEdit : true
                ,correctOrientation: true
            };
            
            navigator.camera.getPicture(onSuccess, onFail, options);
        };
      
        var onSuccess = function(DATA_URL) {
          
            $scope.barberData.foto = DATA_URL;
            
            imgFoto.src = ("data:image/jpeg;base64," + $scope.barberData.foto);             

            $scope.$apply();
        };
        
        var onFail = function(e) {
            console.log("On fail " + e);
        };
        
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        
        var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(0, "black");
        my_gradient.addColorStop(1, "white");
        ctx.fillStyle = my_gradient;
        ctx.fillRect(20, 20, 200, 200);
        
       
        //var imgFoto = new Image();
        var imgFoto = document.getElementById("foto");
        
        if( imgFoto!==null ){
            imgFoto.onload = function(){

                //alert('here');

                canvas.height = imgFoto.height;
                canvas.width = imgFoto.width;
                //canvas.height = 200;
                //canvas.width = 200;
                //ctx.drawImage(imgFoto, 0, 0, 200, 200);
                ctx.drawImage(imgFoto, 0, 0, imgFoto.width, imgFoto.height);
            };
        }
        
        
        //imgFoto.src = $rootScope.barberFoto;
        //imgFoto.onload();
        
        $scope.rotateImage = function() {
            
            ctx.translate(imgFoto.height, 0);
            
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(imgFoto, 0, 0, imgFoto.width, imgFoto.height);

            $scope.barberData.foto = (canvas.toDataURL());
            
            imgFoto.src = $scope.barberData.foto;
            
            if( $scope.barberData.foto.indexOf('png') > -1 ){
                
                $scope.barberData.extensionfoto = 'png';
                $scope.barberData.foto = $scope.barberData.foto.replace("data:image/png;base64,", "");
                
            }else if( $scope.barberData.foto.indexOf('jpeg')>-1 || 
                        $scope.barberData.foto.indexOf('jpg')>-1 ){
                
                $scope.barberData.extensionfoto = 'jpg';
                $scope.barberData.foto = $scope.barberData.foto.replace("data:image/jpeg;base64,", "");
            }
            
            $scope.apply();
        };
        

        $scope.saveBarberProfile = function () {

            //console.log($scope.barberData);

            if( $scope.barberData != null &&
                //( $scope.barberData.foto!=null && $scope.barberData.foto!='' ) &&
                //( $scope.barberData.direccion != null && $scope.barberData.direccion != '' ) &&
                //( $scope.barberData.telefono != null && $scope.barberData.telefono != '' ) &&
                ( $scope.barberData.email != null && $scope.barberData.email != '' ) &&
                ( $scope.barberData.nombre != null && $scope.barberData.nombre != '' ) 
                //( $scope.barberData.currency != null && $scope.barberData.currency != '' ) &&
                //( $scope.barberData.duracioncita != null && $scope.barberData.duracioncita != '' )
                ){

                $ionicPopup.confirm({
                    //title: 'Info',
                    template: 'Are you sure you want to save this information ?'
                    //default: 'cancel'
                }).then(function (res1) {

                    if (res1) {

                        $scope.show();

                        Barbers.saveBarberCreateProfile($scope.barberData).then(function successCallback(result) {

                            //console.log(result);

                            $scope.hide();

                            if (result!= null && result.data!= null && result.data.response != null) {
                                //$scope.services = JSON.parse( JSON.stringify(result.data.response.data) );

                                if (result.data.response.success == true) {
                                    
                                    var msg = "Profile successfully created. Please, check your email for enabling your account";
                                    
                                    if( result.data.response.message!=null && 
                                            result.data.response.message!='' )
                                        msg = result.data.response.message;

                                    $ionicPopup.alert({
                                        //title: 'Info',
                                        template: msg

                                    }).then(function (res2) {
                                        //si se desea hacer alguna accion al darle click en el boton OK
                                        
                                        /*
                                        if( result.data.response.data!=null ){

                                            //console.log(result.data.response.data);

                                            localStorage.setItem('Barber', JSON.stringify(result.data.response.data));

                                            var barber = JSON.parse(localStorage.getItem('Barber'));

                                            //console.log( barber );

                                            $rootScope.barberEmail = barber.Barber.email;
                                            $rootScope.barberFoto = barber.Barber.foto_url;
                                            $rootScope.barberNombre = barber.Barber.nombre;
                                        }
                                    */
                                        
                                        $scope.barberData.foto = '';
                                        $scope.direccion = '';
                                        $scope.telefono = '';
                                        $scope.currency = '';
                                        $scope.email = '';
                                        $scope.duracioncita = '';
                                        $scope.extensionfoto = 'jpg';
                                        $scope.referredcode = '';
                                        
                                        
                                        
                                        //go to login
                                        //$ionicHistory.goBack();
                                        //$window.location.reload(true);
                                        
                                        $ionicHistory.nextViewOptions({
                                            disableAnimate: true,
                                            disableBack: true,
                                            historyRoot: true
                                        });


                                        $location.path('/app/login');
                                        //$location.path('/app/welcome');
                                        /*
                                        $location.path('/app/appointments');
                                        
                                        
                                        $ionicPopup.alert({
                                            //title: 'Info',
                                            template: ('Welcome to BarbersNet ' + $rootScope.barberNombre + '!!!')
                                        });
                                        */
                                        
                                        /*
                                        $ionicHistory.nextViewOptions({
                                            disableAnimate: true,
                                            disableBack: true,
                                            historyRoot: true
                                        });

                                        $location.path('/app/login');
                                        */
                                        //$location.path('/app/myprofile');

                                    });

                                } else {

                                    var msg = "Profile couldn't be created";

                                    if ( result.data.response.message!=null && result.data.response.message!='' )
                                        msg = result.data.response.message;

                                    $ionicPopup.alert({
                                        //title: 'Info',
                                        template: msg
                                    });
                                }

                            } else {

                                $ionicPopup.alert({
                                    //title: 'Info',
                                    template: "Profile couldn't be saved"
                                });
                            }
                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.

                            $scope.hide();
                            $ionicPopup.alert({
                                //title: 'Info',
                                template: 'Please verify your internet connection and try again'
                            });
                        });
                    }
                });

            } else {
                //alert('Please fill data in the form');
                $ionicPopup.alert({
                    //title: 'Info',
                    template: 'Please fill data in the form'
                });
            }
        };
    })
    
;