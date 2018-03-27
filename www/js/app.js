
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'starter.services',
                                    'ngCordova', 'onezone-datepicker', 'ionic-timepicker',
                                    'ionic.service.push','angularMoment', 'jett.ionic.filter.bar',
                                    'ngCordova', 'ionic-timepicker','pascalprecht.translate'
                            ])

    .run(function ($ionicPlatform, $location, $ionicLoading, $window/*, $scope/*, $ionicPopup*/, Barbers/*, Services*/,
        $ionicHistory/*, $state*/, $ionicPopup, $filter) {
        
        $ionicPlatform.ready(function () {
            Ionic.io();            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            
            var barber = localStorage.getItem('Barber');
            
            if( barber!=null && barber!='' && barber!='null' ){
            
                //PUSH ionic
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

                                    //console.log( payload.action + ' - ' + appointment_id + ' - ' + fecha );

                                    //$location.path('/app/appointments2/' + appointment_id + '/' + fecha);

                                    //console.log('push recibido - $ionicPlatform.ready()');
                                    /*
                                    $ionicHistory.nextViewOptions({
                                        disableAnimate: true,
                                        disableBack: true,
                                        historyRoot: true
                                    });
                                    */
                                   /*
                                   if( $ionicHistory.currentView().stateName &&
                                            $ionicHistory.currentView().stateName!=null &&
                                                 $ionicHistory.currentView().stateName!='' ){*/

                                         /*if( $ionicHistory.currentView().stateName=='app.appointments' )
                                             $window.location.href = ('#/app/appointments2/' + appointment_id + '/' + fecha);
                                         else*/ /*if( $ionicHistory.currentView().stateName=='app.appointments2' )
                                             $window.location.href = ('#/app/appointments3/' + appointment_id + '/' + fecha);
                                         else  
                                             $window.location.href = ('#/app/appointments2/' + appointment_id + '/' + fecha);

                                     }else
                                         $window.location.href = ('#/app/appointments2/' + appointment_id + '/' + fecha);*/

                                    //$window.location.href = ('#/app/appointments2/' + appointment_id + '/' + fecha);
                                    
                                    $window.location.href = ('#/app/appointments/' + appointment_id);
                                    
                                    //$location.path('/app/appointments2/' + appointment_id + '/' + fecha);
                                    //$state.transitionTo($state.current, $stateParams, {reload:true, inherit:false})
                                    //$window.location.reload(true);
                                    //$state.go('app.appointments2');
                                }else if( payload.action=='appointment_deleted' ){
                                    
                                    var appointment_id = '', fecha = '', service = '', client = '', motivo='';

                                    if( payload.appointment_id && 
                                        payload.appointment_id!=null && payload.appointment_id!='' ){

                                        appointment_id = payload.appointment_id;
                                    }

                                    if( payload.fecha && 
                                        payload.fecha!=null && payload.fecha!='' ){

                                        fecha = moment(new Date(payload.fecha)).format('MMMM D YYYY, h:mm a');
                                    }
                                    
                                    if( payload.service && 
                                        payload.service!=null && payload.service!='' ){

                                        service = payload.service;
                                    }
                                    
                                    if( payload.client && 
                                        payload.client!=null && payload.client!='' ){

                                        client = payload.client;
                                    }
                                    
                                    if( payload.motivo && 
                                        payload.motivo!=null && payload.motivo!='' ){

                                        motivo = payload.motivo;
                                    }
                                    
                                    $ionicPopup.alert({
                                        title: '<h4 style="color: 464646">'+ $filter('translate')('appo_canceled_reminder')+'</h4>',
                                        template: ('\n' + service + '<br/> ' + fecha + '<br/> ' + client + '<center>' + motivo + '</center>')
                                    }).then(function (res) {
                                        $ionicHistory.goBack();
                                        $window.location.reload(true);
                                        
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

                            barber = JSON.parse(localStorage.getItem('Barber'));
                            
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
                                    template: '<ion-spinner></ion-spinner>'
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
                                extensionfoto: '',
                                paypalemail: '',
                                codigoreferido: '',
                                impuestos: '',
                                descripcion: '',
                                nombrebarberia: '',
                                latitud: '',
                                longitud: '',
                                password: '',
                                walkin_client_id: '',
                                locale: '',
                                activo: '',
                                mensaje_inactivo: '',
                            };

                            show();

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
            }
            
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $translateProvider/*, $ionicAppProvider*/) {
        $stateProvider
        
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

        .state('app.about', {
            url: '/about',
            views: {
                'menuContent': {
                    templateUrl: 'templates/about.html'
                }
            }
        })

        .state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/login.html',
                    controller: 'AppCtrl'
                }
            }
        })

        /*
        .state('app.signin', {
            url: '/signin',
            abstract: true,
            templateUrl: 'templates/barber-add.html',
            controller: 'BarberAddCtrl'
        })
        */

        .state('app.signin', {
            url: '/signin',
            //abstract: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/barber-add.html',
                    controller: 'BarberAddCtrl'
                }
            }
        })

        .state('app.appointments', {
            cache: false,
            url: '/appointments',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appointments.html',
                    controller: 'AppointmentsCtrl'
                }
            }
        })

        .state('app.appointments2', {
            url: '/appointments2/:appointment_id/:fecha',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appointments.html',
                    controller: 'AppointmentsCtrl'
                }
            }
        })

        //empanadita para poder recargar appointments.html cuando llegue un push y la app esté abierta en dicha pantalla
        .state('app.appointments3', {
            url: '/appointments3/:appointment_id/:fecha',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appointments.html',
                    controller: 'AppointmentsCtrl'
                }
            }
        })

        .state('app.appointment', {
            url: '/appointments/:appointment_id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appointment.html',
                    controller: 'AppointmentDetailCtrl'
                }
            }
        })
        .state('app.appointment-add', {
            url: '/appointment-add',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appointment-add.html',
                    controller: 'AppointmentAddCtrl'
                }
            }
        })
        .state('app.appointment-add2', {
            url: '/appointment-add2/:fecha/:hora',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appointment-add.html',
                    controller: 'AppointmentAddCtrl'
                }
            }
        })
        .state('app.appointment-edit', {
            url: '/appointment-edit/:appointment_id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/appointment-edit.html',
                    controller: 'AppointmentEditCtrl'
                }
            }
        })
        .state('app.clients', {
            cache: false,
            url: '/clients',
            views: {
                'menuContent': {
                    templateUrl: 'templates/clients.html',
                    controller: 'ClientsCtrl'
                }
            }
        })
        .state('app.client', {
            url: '/clients/:mobile_user_id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/client.html',
                    controller: 'ClientDetailCtrl'
                }
            }
        })
        .state('app.client-history', {
            url: '/client-history/:mobile_user_id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/client-history.html',
                    controller: 'ClientHistoryCtrl'
                }
            }
        })
        .state('app.client-add', {
            url: '/client-add',
            views: {
                'menuContent': {
                    templateUrl: 'templates/client-add.html',
                    controller: 'ClientAddCtrl'
                }
            }
        })
        .state('app.client-edit', {
            url: '/client-edit/:client_id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/client-edit.html',
                    controller: 'ClientEditCtrl'
                }
            }
        })
        .state('app.services', {
            cache: false,
            url: '/services',
            views: {
                'menuContent': {
                    templateUrl: 'templates/services.html',
                    controller: 'ServicesCtrl'
                }
            }
        })
        .state('app.service-add', {
            url: '/service-add',
            views: {
                'menuContent': {
                    templateUrl: 'templates/service-add.html',
                    controller: 'ServicesAddCtrl'
                }
            }
        })
        .state('app.service-edit', {
            url: '/service-edit/:service_id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/service-edit.html',
                    controller: 'ServicesEditCtrl'
                }
            }
        })

        .state('app.reports', {
            url: '/reports',
            views: {
                'menuContent': {
                    templateUrl: 'templates/reports.html',
                    controller: 'BarberReportsCtrl'
                }
            }
        })

        .state('app.myprofile', {
            url: '/myprofile',
            views: {
                'menuContent': {
                    templateUrl: 'templates/miperfil.html',
                    controller: 'BarberProfileCtrl'
                }
            }
        })

        .state('app.myprofile-edit', {
            url: '/myprofile-edit',
            views: {
                'menuContent': {
                    templateUrl: 'templates/miperfil-edit.html',
                    controller: 'BarberProfileEditCtrl'
                }
            }
        })

        /*
        .state('app.mapa', {
            url: '/mapa',
            views: {
                'menuContent': {
                    templateUrl: 'templates/mapa.html',
                    controller: 'PruebaMapaCtrl'
                }
            }
        })
        
        .state('app.welcome', {
            url: '/welcome',
            views: {
                'menuContent': {
                    templateUrl: 'templates/welcome.html',
                    controller: 'AppCtrl'
                }
            }
        })
        */
        .state('app.resources', {
            url: '/resources',
            views: {
                'menuContent': {
                    templateUrl: 'templates/resources.html'//,
                    //controller: 'AppCtrl'
                }
            }
        })
        .state('app.posts', {
            url: '/posts',
            views: {
                'menuContent': {
                    templateUrl: 'templates/posts.html',
                    controller: 'PostsCtrl'
                }
            }
        })
        .state('app.post-add', {
            url: '/post-add/:post_id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/post-add.html',
                    controller: 'PostAddCtrl'
                }
            }
        })
        /*
        .state('app.single', {
            url: '/playlists/:playlistId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/playlist.html',
                    controller: 'PlaylistCtrl'
                }
            }
        })*/
        ;

        var barber = localStorage.getItem('Barber');
        
        localStorage.setItem('fechaTempApps', '');
        
        //var barber = JSON.parse(localStorage.getItem('Barber'));
        
        //console.log( barber);
        //console.log( 'barber: -' + typeof(barber) + '-');
        //console.log( 'barber: -' + barber.length + '-');
        var lc = navigator.language;
        if(lc.length > 2){
            lc = lc.split('-');
            lc = lc['0'];
        }
            
        console.log('navigator language:'+lc);
        if( //barber==null || barber=='' || barber=="" || typeof(barber)=='undefined'*/ 
            barber!=null && barber!='' && barber!='null'
            //&& typeof(barber)==='object'  && barber.length>0 */
        ){
            barber = JSON.parse(localStorage.getItem('Barber'));
            console.log(barber);
            lc = barber.Barber.locale;
            //console.log('appointments');
            /*
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true,
                historyRoot: true
            });
            */
            $urlRouterProvider.otherwise('/app/appointments');
            //$urlRouterProvider.otherwise('/app/mapa');
            //$urlRouterProvider.otherwise('/app/login');
            
        }else{

            //console.log('login');
            $urlRouterProvider.otherwise('/app/login');
            //$urlRouterProvider.otherwise('/app/welcome');
        }
        
        //$urlRouterProvider.otherwise('/app/login');
        
        //console.log('here1');
        
        //console.log( 'barber: ' + localStorage.getItem( 'Barber') );
        
        $translateProvider.translations('en', {
            menu_1: "My Appointments",
            menu_2: "My Clients",
            menu_3: "Balance Sheet",
            menu_4: "My Services",
            menu_5: "My Profile",
            menu_6: "Resources",
            menu_7: "About...",
            barber: "Barber",
            barbershop: "BarberShop",
            appointment: "Appointment",
            detail_appo: "Appointment Detail",
            new: "New",
            set_date: "Set Date",
            service: "Service",
            points: "Points",
            obs: "Observations",
            add: "Schedule",
            select_time: "Select Time",
            select_service: "Select Service",
            obs_ph: "Write here something important",
            no_date: "No date selected",
            phone: "Phone",
            client_since: "Client since",
            sharing_client_msg: "Download BarbersNet Client App and sign in using the my code barber: ",
            sharing_barber_msg: "Download BarbersNet Barber App and sign in using the my code barber: ",
            edit: "Edit",
            password: "Password",
            gender: "Gender",
            male: "Male",
            female: "Female",
            birthdate: "Birthdate",
            save: "Save",
            sign_up: "Sign Up",
            email: "E-Mail",
            email_obs: "It will be your username",
            password_obs: "It will be your password",
            name: "Name",
            full_name: "Full Name",
            optional: "Optional",
            required: "Required",
            barber_ref_code: "referal code",
            comments: "Description or biography",
            login: "Login for Barbers",
            sign_in: "Sign In",
            create_account: "Create New Account",
            forgot_password: "Did you forget your password?",
            enter_email: "Enter your E-mail",
            pending_appo: "No appointments were found",
            no_avilable_time: "No available time was found",
            address: "Address",
            current_location: "Getting current location",
            slogan_barber: "An App from Barbers to Barbers",
            developed_by: "Developed by",
            sign_out_msg: "Are you sure you want to sign out?",
            
            error_login: "Failed login, please try again!",
            complete_login: "Please, type your username and password",
            verify_connection: "Please verify your internet connection and try again",
            type_email: "You must type a valid email",
            no_appo: "No appointment was found",
            no_appo_list: "No appointments were found",
            no_server_connection: "There is no connection with server",
            type_reasons: "Please type the reasons",
            confirm_delete: "Are you sure you want delete this appointment?",
            error_delete: "Appointment couldn't be deleted",
            no_choosen_barber: "You don't have a choosen barber. Do you want to search for one?",
            change_barber: " is not your choosen barber.<br/>Do you want to change ?",
            msg_changed_barber: "Barber was changed",
            msg_no_changed_barber: "Barber couldn't be changed",
            no_services: "No services were found",
            no_time: "No time available was found",
            choose_time: "Choose an avalaible time",
            confirm_save_appo: "Are you sure you want to save this appointment ?",
            saved_appo: "Appointment saved successfully",
            no_saved_appo: "Appointment couldn't be saved",
            complete_form: "Please complete the form",
            unable_location: "Unable to get location. Please, turn on your location settings",
            no_barbers_found: "No barbers were found",
            search_barbers: "Search Barbers",
            radius: "Radius",
            confirm_edit_info: "Are you sure you want to edit this info?",
            confirm_create_account: "Are you sure you want create your account?",
            welcome_msg: "User information saved.<br/><b>Welcome to BarbersNet!</b>",
            confirm_del_pic: "Do you want delete this picture?",
            cancel: "Cancel",
            send: "Send",
            yes: "Yes",
            reminder_appo: "Hey! you have an appointment scheduled",
            distance: "Distance",
            type_criteria_contact: 'Type the criteria for searching contacts',
            
            discount: "Discount",
            client:"Client",
            history: "History",
            pick_contact: "Pick a Contact",
            fill_form_contact: "Or fill these information",
            per_day: "Per day",
            last_7_days: "Last 7 days",
            this_month: "This Month",
            this_year: "This Year",
            incomes: "Incomes",
            delete: "Delete",
            price: "Price",
            title: "Title",
            average_time: "Average service time (min)",
            paypal_email: "Paypal email",
            business_taxes: "Business taxes",
            located: "Located",
            locate_on_map: "Locate on the map",
            currency: "Currency",
            schedule: "Schedule",
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday   ",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday",
            sunday: "Sunday",
            disable_day: "Disable Day",
            starts: "Starts",
            ends: "Ends",
            resources_one: "Registration, Profile and Sharing",
            resources_two: "the App with your Clients",
            walk_in_client: "WALK IN CLIENT",
            appo_canceled_reminder: "Appointment Canceled",
            type_password: "Please type your email and password",
            no_client_list: "No clients were found",
            confirm_send_info: "Are you sure you want to send the information?",
            length: "Length",
            length_ph: "Average duration in minutes",
            contacts_found: " please, choose a contact",
            no_saved_client: "Client couldn't be saved",
            no_client_history: "Client history not found",
            confirm_del_info: "Are you sure you want delete this information?",
            confirm_add_info: "Are you sure you want add this information?",
            no_saved_info: "Information couldn't be saved",
            share_with_barbers: "Sharing with Barbers",
            share_with_clients: "Invite your Clients",
            share: "Share",
            post: "Post",
            posts: "Posts",
            choose_img_or_link: "Take a photo, add an image or paste a youtube link",
            paste_link: "Copy and paste here a youtube link",
            complete_post: "You must post a picture or youtube link",
            news: "News",
            promos: "Promos",
            sales: "Sales",
            vacancies: "Vacancies",
            news_desc: "Publica tus contenidos, tus trabajos, tendecias o noticias que quieras compartir con clientes y otros barberos .  Este contendio  tendra una duración de 24 horas.",
            promos_desc: "Realiza una oferta o promoción para que llegues a todos tus clientes y captes más audiencia! .  Coloca la duración de la promoción",
            sales_desc: "Utiliza nuestra plataforma para que tus clientes y demas usuarios conozcan tus productos y/o servicios",
            vacancies_desc: "¿Sabes de alguna vacante? ¿Necesitas contratar Barberos? Realiza una publicación con el perfil que necesitas",
            type_content: "Add a content type",
            inactive_mode: "You are now in inactive mode!. Leave a message for your customers, So that they know when you are available again.",
            active: 'Active',
            inactive: 'Inactive',
            welcome_back: "Welcome back! Don't forget save the changes",
            tip: "Tip",
            pay_add: "Additional pay",
            expenses: "Expenses",
            start: "Incio",
            end: "Fin",
            type_expenses: "Please, write down your total expenses.",
            duration_days: "Duration of publication (Days)",
            search: 'Search',
            all_sections: 'All Sections',
            onfirm_delete: "Are you sure you want delete this appointment?",
        });
    $translateProvider.translations('es', {
            menu_1: "Mis Citas",
            menu_2: "Mis Clientes",
            menu_3: "Balances",
            menu_4: "Mis Servicios",
            menu_5: "Mi Perfil",
            menu_6: "Recursos",
            menu_7: "Acerca de...",
            barber: "Barbero",
            barbershop: "Barbería",
            appointment: "Cita",
            detail_appo: "Detalle de Cita",
            new: "Agregar",
            set_date: "Elige una Fecha",
            service: "Servicios",
            points: "Puntos",
            obs: "Observaciones",
            add: "Agendar",
            select_time: "Escoge una Hora",
            select_service: "Escoge un Servicio",
            obs_ph: "Escribe aquí algo importante",
            no_date: "Sin Fecha",
            phone: "Teléfono",
            client_since: "Cliente desde",
            sharing_client_msg: "Descarga la aplicación BarbersNet para Clientes y registrate con mi código: ",
            sharing_barber_msg: "Descarga la aplicación BarbersNet para Barberos y registrate con mi código: ",
            edit: "Editar",
            password: "Contraseña",
            gender: "Sexo",
            male: "Masculino",
            female: "Femenino",
            birthdate: "Fecha nacimiento",
            save: "Guardar",
            sign_up: "Registro",
            email: "E-Mail",
            email_obs: "Este será tu usuario",
            password_obs: "Esta será contraseña",
            name: "Nombre",
            full_name: "Tu nombre completo",
            optional: "Opcional",
            required: "Obligatorio",
            barber_ref_code: "Codigo de referencia",
            comments: "Descripción o biografía",
            login: "Registro para Barberos",
            sign_in: "Ingresar",
            create_account: "Crear nueva cuenta",
            forgot_password: "Olvidaste tu contraseña?",
            enter_email: "Ingresa tu E-mail",
            pending_appo: "No se encontraron citas",
            no_avilable_time: "No hay horas disponibles",
            address: "Dirección",
            current_location: "Obteniendo ubicación actual",
            slogan_barber: "Una aplicación de barberos para barberos",
            developed_by: "Desarrollado por",
            sign_out_msg: "Estás seguro que deseas cerrar sesión?",
            
            error_login: "Error de inicio de sesión, inténtelo de nuevo!",
            complete_login: "Por favor, escriba su nombre de usuario y contraseña",
            verify_connection: "Verifique su conexión a Internet y vuelva a intentarlo",
            type_email: "Debe escribir un correo electrónico válido",
            no_appo: "No se encontró cita",
            no_appo_list: "No se encontraron citas",
            no_server_connection: "No hay conexión con el servidor",
            type_reasons: "Por favor escribe los motivos",
            confirm_delete: "¿Seguro que quieres eliminar esta cita?",
            error_delete: "No se pudo eliminar la cita",
            no_choosen_barber: "No tienes un barbero elegido. ¿Desea buscar uno?",
            change_barber: " no es tu barbero elegido.<br/>¿Quieres cambiarlo?",
            msg_changed_barber: "Tu barbero fue cambiado",
            msg_no_changed_barber: "Tu barbero no se pudo cambiar",
            no_services: "No se encontraron servicios",
            no_time: "No se encontró tiempo disponible",
            choose_time: "Elija una hora disponible",
            confirm_save_appo: "¿Seguro que desea guardar esta cita?",
            saved_appo: "Cita enviada exitosamente",
            no_saved_appo: "No se pudo guardar la cita",
            complete_form: "Por favor, complete el formulario",
            unable_location: "No se puede obtener la ubicación. Por favor, active la configuración de su ubicación",
            no_barbers_found: "No se encontraron barberos",
            search_barbers: "Buscar Barberos",
            radius: "Radio",
            confirm_edit_info: "¿Estas seguro que deseas editar esta información?",
            confirm_create_account: "¿Seguro que quieres crear tu cuenta?",
            welcome_msg: "Información de usuario guardada.<br/><b>Beinvenido a BarbersNet!</b>",
            confirm_del_pic: "¿Quieres eliminar esta imagen?",
            cancel: "Cancelar",
            send: "Enviar",
            yes: "Sí",
            reminder_appo: "¡Oye! Tienes una cita programada",
            distance: "Distancia",
            type_criteria_contact: "Escriba un nombre para buscar un contacto",
            
            discount: "Descuento",
            client:"Cliente",
            history: "Historial",
            pick_contact: "Escoja un contacto",
            fill_form_contact: "O Complete esta información",
            per_day: "Por día",
            last_7_days: "Últimos 7 días",
            this_month: "Este mes",
            this_year: "Este año",
            incomes: "Ingresos",
            delete: "Eliminar",
            price: "Precio",
            title: "Título",
            average_time: "Tiempo promedio de atención",
            paypal_email: "Correo PayPal",
            business_taxes: "Impuestos Barberia",
            located: "Ubicado",
            locate_on_map: "Ubicate en el mapa",  
            currency: "Moneda",
            schedule: "Horario",
            monday: "Lunes",
            tuesday: "Martes",
            wednesday: "Miércoles",
            thursday: "Jueves",
            friday: "Viernes",
            saturday: "Sábado",
            sunday: "Domingo",
            disable_day: "Desactivar Día",
            starts: "Inicia",
            ends: "Termina",
            resources_one: "Registro, perfil y compartir",
            resources_two: "la aplicación con tus clientes",
            walk_in_client: "CLIENTE SIN CITA",
            appo_canceled_reminder: "Cita Cancelada",
            type_password: "Por favor escriba su e-mail y/o contraseña",
            no_client_list: "No encontramos clientes",
            confirm_send_info: "Estas seguro de enviar esta información?",
            length: "Duración",
            length_ph: "Duración promedio en minutos",
            contacts_found: " por favor, escoja uno",
            no_saved_client: "No se pudo guardar la información del cliente",
            no_client_history: "No hay historial de este cliente",
            confirm_del_info: "¿Estás seguro de eliminar esta información?",
            confirm_add_info: "¿Estás seguro de agregar esta información?",
            no_saved_info: "No se pudo gardar",
            share_with_barbers: "Compartir con Barberos",
            share_with_clients: "Invita a tus clientes",
            share: "Compartir",
            post: "Publicar",
            posts: "Publicaciones",
            choose_img_or_link: "Puedes tomar una foto, agregar una imagen o pegar un link de youtube",
            paste_link: "Copia y pega aquí el link de youtube",
            complete_post: "Debes publicar una imagen o link de youtube",
            news: "Noticias",
            promos: "Promociones",
            sales: "Ventas",
            vacancies: "Vacantes",
            news_desc: "Publica tus contenidos, tus trabajos, tendecias o noticias que quieras compartir con clientes y otros barberos.  Este contendio  tendra una duración de 24 horas.",
            promos_desc: "Realiza un publicación en la cual ofrezacas promociones y descuentos para que llegues a todos tus clientes y captes más audiencia!",
            sales_desc: "Utiliza nuestra plataforma para que tus clientes y demas usuarios conozcan tus productos y/o servicios",
            vacancies_desc: "¿Sabes de alguna vacante? ¿Necesitas contratar Barberos? Realiza una publicación con el perfil que necesitas",
            type_content: "Agrega un tipo de contenido",
            inactive_mode: "Ahora estás en modo inactivo!. Deja un mensaje para tus clientes, para que sepan cuando estas disponible de nuevo.",
            active: 'Activo',
            inactive: 'Inactivo',
            welcome_back: "Bienvenido! No olvides guardar los cambios",
            tip: "Propina",
            pay_add: "Pago adicional",
            expenses: "Gastos",
            start: "Incio",
            end: "Fin",
            type_expenses: "Por favor, escribe el total de tus gastos",
            duration_days: "Duración de la publicación (Días)",
            search: 'Búsqueda',
            all_sections: 'Todas las secciones',
            confirm_del_post: "¿Estás seguro que deseas borrar esta publicación?",
    });
    $translateProvider.preferredLanguage(lc);
    $translateProvider.fallbackLanguage(lc);
    //$translateProvider.useSanitizeValueStrategy('escape');
    moment.locale(lc);
    });