//var wsUrlBase = 'http://www.mobolapps.com/desarrollos/barbersnet/web_service/';
var wsUrlBase = 'http://www.barbersnet.com/backend/web_service/';

var wsExt = '.json';
//var wsUrlBase = '/barbersnetweb/web_service/';
var wsBarberServices        =   'barbers_services';
var wsAvailableService      =   'barbers_availableservices';
var wsSaveBarberServices    =   'barbers_saveservices';

var wsAddBarberServices     =   'barbers_addservice';
var wsEditBarberServices    =   'barbers_editservice';


var wsBarberClients         =   'barbers_clients';
var wsBarberAppointments    =   'barbers_appointments';
var wsBarberReports         =   'barbers_reports';
var wsBarberGetAppointment  =   'barbers_getappointment';
var wsBarberGetLogin        =   'barbersnet_login';
//var wsBarberView            =   'barbers_view';
var wsBarberSaveProfile     =   'barbers_edit';
var wsBarberCreateProfile   =   'barbers_add';
var wsBarberGetHorario      =   'barbers_gethorario';
var wsBarberSaveSchedule     =   'barbers_edithorario';

var wsSearchBarberClients   =   'barbers_searchclients';
var wsBarberGetWalkInClient =   'barbers_getwalkinclient';
var wsBarberRememberPassword =  'barbers_rememberpassword';

var wsBarberAddExpense       =  'barbers_add_expense';

var wsDeleteService         =   'service_delete';
var wsGetService            =   'service_view';

var wsSaveBarberClient      =   'musers_add';
var wsSaveBarberClientEdit  =   'musers_edit';
var wsClientHistory         =   'musers_history';

//var wsSaveBarberAppointment =        'appointments_add';
var wsSaveBarberAppointment =        'appointments_addOrEdit';
var wsDeleteAppointment     =        'appointments_delete';
//horas disponible de un barbero en una determinada fecha
var wsAppointmentsHorasDisponibleFecha = 'appointments_horasdisponiblesfecha';

var wsGetMobileUser = 'musers_view';
var wsServicesList = 'services_list';

var wsSavePost = 'posts_add';
var wsPostsList             =            'posts_list';             
var wsPostsLike             =            'posts_like';
var wsPostsDelete           =            'posts_delete';   


angular.module('starter.services', [])


.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.timeout = 10*1000;
}])

.factory('App', function($http, $rootScope, $stateParams) {
  // Might use a resource here that returns a JSON array


    var doLogin = function($data) {

        //console.log($data.password + ' - ' + $data.email);
        
        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberGetLogin + wsExt,
            //data: 'password=' + $data.password + '&email=' + $data.email,
            //empanadita (2 espacios al final)
            data: 'email=' + $data.email + '&password=' + $data.password 
                    + '&enviadopor=' + $data.enviadopor 
                    + '&locale=' + $data.locale + "&nothing=",
            //timeout : 1000,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s
        });
    };
    
    
    return {
        
        login: doLogin
    };
 })

.factory('Appointments', function($http, $rootScope, $stateParams) {
  // Might use a resource here that returns a JSON array

    var getInfoBarberAppointments = function($params) {
        
        //console.log($params);

        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberAppointments + wsExt,
            data: 'barber_id=' + $params.barber_id + '&fecha=' + $params.fecha + "&nothing=",
            //timeout : 1000,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    var getInfoBarberAppointment = function($data) {
        
        //console.log( $data );

        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberGetAppointment + wsExt,
            data: 'barber_id=' + $data.barber_id + '&appointment_id=' + $data.appointment_id,
            //timeout : 1000,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    var searchInfoTimeAvailable = function($data) {
        
        //console.log( wsUrlBase + wsAppointmentsHorasDisponibleFecha + wsExt );
        //console.log( $data );
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsAppointmentsHorasDisponibleFecha + wsExt,
            data: (
                    'barber_id=' + $data.barber_id +
                    '&fecha=' + $data.fecha +
                    '&hora=' + $data.hora +
                    "&nothing="
                ),
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 40000//40s  
            
        });
    };
    
    var saveBarberAppointmentInfo = function($data) {
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsSaveBarberAppointment + wsExt,
            data:   
                    "appointment_id="   + $data.appointment_id +
                    "&barber_id="       + $data.barber_id + 
                    "&mobile_user_id="  + $data.client_id + 
                    "&service_id="      + $data.service_id + 
                    "&duracion="        + $data.duracion +
                    "&fecha="           + $data.fecha + 
                    "&hora="            + $data.hora +
                    "&enviadopor="      + $data.enviadopor +
                    "&accion="          + $data.accion +
                    "&valoradicional="  + $data.valoradicional +
                    "&tipovaloradicional=" + $data.tipovaloradicional +
                    "&observaciones="   + encodeURIComponent($data.observaciones) +
                    "&nothing=",
            //timeout: 10*1000,
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 60000//60s   
        });
    };
    
    var deleteInfoAppointment = function($data) {
       
        return $http({
            method: 'POST',
            url: wsUrlBase + wsDeleteAppointment + wsExt,
            data:   (
                        "barber_id="        + $data.barber_id + 
                        "&appointment_id="  + $data.appointment_id + 
                        "&enviadopor="      + $data.enviadopor + 
                        "&observaciones="   + encodeURIComponent($data.observaciones) + 
                        "&nothing="
                    ),
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s
        });
    };
    
    return {
        getBarberAppointments: getInfoBarberAppointments,
        getBarberAppointment: getInfoBarberAppointment,
        searchTimeAvailable: searchInfoTimeAvailable,
        saveBarberAppointment: saveBarberAppointmentInfo,
        deleteAppointment: deleteInfoAppointment
    };
 })
 
 .factory('Barbers', function($http, $rootScope, $stateParams) {
  // Might use a resource here that returns a JSON array

    var getInfoBarberReports = function($params) {
        
        //console.log($params);

        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberReports + wsExt,
            data: (
                    'barber_id='    + $params.barber_id +
                    '&tiempo='      + $params.tiempo + //no se utiliza
                    '&fechainicio='       + $params.fechainicio +
                    '&fechafin='       + $params.fechafin +
                    "&nothing="),
            //timeout : 5,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    var getInfoBarber = function($params) {
        
        //console.log($params);

        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberView + wsExt,
            data: ('barber_id=' + $params.barber_id + "&nothing="),
            //timeout : 1000,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    var saveInfoBarberEditProfile = function($params) {
        
        var paramsHorario = '';
        if( $params.horario && $params.horario!=null && $params.horario!='' ){
            
            var dias = [ 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo' ];
            var tipos = [ 'inicio1', 'fin1', 'inicio2', 'fin2'  ];

            for(var i = 0; i < dias.length; i++){
                
                for(var j = 0; j < tipos.length; j++){
                    
                    try{
                        if($params.horario[dias[i]][tipos[j]] != null && $params.horario[dias[i]][tipos[j]] != '' && $params.horario[dias[i]][tipos[j]] != 'undefined')
                            paramsHorario += ( '&' + dias[i] + tipos[j] + '=' + $params.horario[dias[i]][tipos[j]] );
                        else
                            paramsHorario += ( '&' + dias[i] + tipos[j] + '=' + ' ' );
                    }catch(e){}
                    
                }
            }
            
            //console.log( paramsHorario );//return;
            
            /*
            paramsHorario = ( 
                    '&lunesinicio='     + $params.horario['lunes']lunesinicio + 
                    '&lunesfin='        + $params.lunesfin + 
                    '&martesinicio='    + ($params.martesinicio) +
                    '&martesfin='       + ($params.martesfin) +
                    '&miercolesinicio=' + $params.miercolesinicio + 
                    '&miercolesfin='    + $params.miercolesfin +
                    '&juevesinicio='    + $params.juevesinicio +
                    '&juevesfin='       + $params.juevesfin +
                    '&viernesinicio='   + ($params.viernesinicio) +
                    '&viernesfin='      + ($params.viernesfin) +
                    '&sabadoinicio='    + $params.sabadoinicio +
                    '&sabadofin='       + $params.sabadofin +
                    '&domingoinicio='   + $params.domingoinicio +
                    '&domingofin='      + $params.domingofin 
                            );
                    */
        }
        
        var parametros = (
                    'barber_id='        + $params.barber_id + 
                    '&email='           + $params.email + 
                    '&telefono='        + $params.telefono + 
                    '&direccion='       + encodeURIComponent($params.direccion) +
                    '&descripcion='     + encodeURIComponent($params.descripcion) +
                    '&currency='        + $params.currency + 
                    '&duracioncita='    + $params.duracioncita +
                    '&paypalemail='     + $params.paypalemail +
                    '&impuestos='       + $params.impuestos +
                    '&codigoreferido='  + encodeURIComponent($params.codigoreferido) +
                    '&nombrebarberia='  + encodeURIComponent($params.nombrebarberia) +
                    '&latitud='         + $params.latitud +
                    '&longitud='        + $params.longitud +
                    '&password='        + $params.password +
                    '&tokenpush='       + encodeURIComponent($params.tokenpush) +
                    '&extensionfoto='   + $params.extensionfoto + 
                    '&locale='          + $params.locale + 
                    '&foto='            + $params.foto + 
                    paramsHorario +
                    '&activo='          + $params.activo +
                    '&mensaje_inactivo='+ encodeURIComponent($params.mensaje_inactivo) +
                    '&nothing='
                );
        
        //console.log(parametros);
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberSaveProfile + wsExt,
            data: ( parametros
                ),
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 60000//60s   
        });
    };
    
    /*
    var saveInfoBarberEditSchedule = function($params) {
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberSaveSchedule + wsExt,
            data: ( 'barber_id='        + $params.barber_id + 
                    '&lunesinicio='     + $params.lunesinicio + 
                    '&lunesfin='        + $params.lunesfin + 
                    '&martesinicio='    + ($params.martesinicio) +
                    '&martesfin='       + ($params.martesfin) +
                    '&miercolesinicio=' + $params.miercolesinicio + 
                    '&miercolesfin='    + $params.miercolesfin +
                    '&juevesinicio='    + $params.juevesinicio +
                    '&juevesfin='       + $params.juevesfin +
                    '&viernesinicio='   + ($params.viernesinicio) +
                    '&viernesfin='      + ($params.viernesfin) +
                    '&sabadoinicio='    + $params.sabadoinicio +
                    '&sabadofin='       + $params.sabadofin +
                    '&domingoinicio='   + $params.domingoinicio +
                    '&domingofin='      + $params.domingofin +
                    '&nothing='
                ),
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 60000//60s   
        });
    };
    */
    var requestInfoRememberPassword = function($params) {
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberRememberPassword + wsExt,
            data: ( 'email='        + $params.email + 
                    '&enviadopor='  + $params.enviadopor + 
                    '&nothing='
                ),
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 60000//60s   
        });
    };
    
    var saveInfoBarberCreateProfile = function($params) {
        
        //console.log($params);

        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberCreateProfile + wsExt,
            data: ( 'email='           + $params.email + 
                    '&nombre='          + encodeURIComponent($params.nombre) +
                    '&telefono='        + $params.telefono + 
                    '&direccion='       + encodeURIComponent($params.direccion) +
                    '&descripcion='     + encodeURIComponent($params.descripcion) +
                    '&currency='        + $params.currency + 
                    '&duracioncita='    + $params.duracioncita +
                    '&codigoreferido='  + encodeURIComponent($params.codigoreferido) +
                    '&nombrebarberia='  + encodeURIComponent($params.nombrebarberia) +
                    '&extensionfoto='   + $params.extensionfoto + 
                    '&foto='            + $params.foto + 
                    '&nothing='
                ),
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 60000//60s   
        });
    };
    
    var getInfoBarberHorario = function($data) {
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberGetHorario + wsExt,
            data: 'barber_id=' + $data.barber_id + '&nothing=',
            //timeout : 1000,
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    var barberAddExpense = function($param) {
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberAddExpense + wsExt,
            data: 'barber_id=' + $param.barber_id +
                  '&cantidad_citas=' + $param.cantidad_citas + 
                  '&ingresos=' + $param.ingresos +
                  '&egresos=' + $param.egresos +
                  '&fecha=' + $param.fecha +
                  '&descuentos=' + $param.descuentos +
                  '&propinas=' + $param.propinas +
                  '&adicional=' + $param.adicional +
                  '&observaciones=' + $param.observaciones +
                  '&nothing=',
            //timeout : 1000,
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    return {
        getBarberReports: getInfoBarberReports,
        getBarberInfo: getInfoBarber,
        saveBarberEditProfile: saveInfoBarberEditProfile,
        saveBarberCreateProfile: saveInfoBarberCreateProfile,
        requestRememberPassword: requestInfoRememberPassword,
        getBarberHorario: getInfoBarberHorario,
        saveBarberExpense: barberAddExpense//,
        //saveBarberEditSchedule: saveInfoBarberEditSchedule
    };
 })


.factory('Clients', function($http, $rootScope, $stateParams) {
  // Might use a resource here that returns a JSON array

    //var clients;

    var getInfoBarberClients = function($params) {
        //return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })

        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberClients + wsExt,
            data: 'barber_id=' + $params.barber_id,
            //timeout : 1000,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s    
        });
    };
    
    /*
    var getInfoAllClients = function($params) {
        //return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })

        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
                method: 'POST',
                url: wsUrlBase + wsServicesList + wsExt,
                data: 'barber_id=' + $params.barber_id,
                
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                }
        });
    };
    */
    
    var getInfoBarberAppointments = function($params) {

        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberAppointments + wsExt,
            data: 'barber_id=' + $params.barber_id,
            //timeout : 1000,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s  
        });
    };
    
    
    var saveBarberClientInfo = function($data) {
       //return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsSaveBarberClient + wsExt,
            //data: 'barber_id=' + $stateParams.barber_id + '?service_id=' + $stateParams.service_id,
            data:   "barber_id="    + $data.barber_id + 
                    "&nombre="      + encodeURIComponent($data.name) + 
                    "&email="       + $data.email + 
                    "&telefono="    + $data.phone + 
                    "&sexo="        + $data.gender + 
                    //"&fechanacimiento=" + $data.nacimiento + 
                    "&fechanacimiento=" + $data.birthday + 
                    "&enviadopor=" + $data.enviadopor +         
                    //"&observaciones=" + $data.obs + 
                    "&nothing=",
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 60000//60s   
        });
    };
    
    var saveBarberClientEditInfo = function($data) {
       //return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsSaveBarberClientEdit + wsExt,
            //data: 'barber_id=' + $stateParams.barber_id + '?service_id=' + $stateParams.service_id,
            data:   "barber_id="    + $data.barber_id + 
                    "&mobile_user_id=" + $data.mobile_user_id +
                    "&nombre="      + encodeURIComponent($data.name) + 
                    "&email="       + $data.email + 
                    "&telefono="    + $data.phone + 
                    "&sexo="        + $data.gender + 
                    //"&fechanacimiento=" + $data.nacimiento + 
                    "&fechanacimiento=" + $data.birthday + 
                     "&enviadopor=" + $data.enviadopor +         
                    //"&observaciones=" + $data.obs + 
                    "&nothing=",
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 60000//60s   
        });
    };
    
    
    var getInfoClientHistory = function($data) {
       //return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })
        
        //alert($rootScope.data);
        //console.log( $stateParams );
        //console.log( $rootScope );
        //console.log( $data );
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsClientHistory + wsExt,
            //data: 'barber_id=' + $stateParams.barber_id + '?service_id=' + $stateParams.service_id,
            data:   "barber_id=" + $data.barber_id + 
                    "&mobile_user_id=" + $data.mobile_user_id +
                    "&nothing=",
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    var getInfoClient = function($params) {
        //return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsGetMobileUser + wsExt,
            data: ('mobile_user_id=' + $params.mobile_user_id + '&barber_id=' + $params.barber_id),

            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s  
        });
    };
    
    
    var getInfoBarberGetWalkInClient = function($params) {

        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberGetWalkInClient + wsExt,
            data: 'barber_id=' + $params.barber_id + "&nothing=",
            //timeout : 1000,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s  
        });
    };
    
    var searchInfoBarberClients = function($params) {

        return $http({
            method: 'POST',
            url: wsUrlBase + wsSearchBarberClients + wsExt,
            data: 'barber_id=' + $params.barber_id + '&criterio=' + encodeURIComponent($params.criteria) + 
                    "&nothing=",
            //timeout : 1000,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s  
        });
    };
    
    return {
        getBarberClients: getInfoBarberClients,
        //getAllClients: getInfoAllClients,
        saveBarberClient: saveBarberClientInfo,
        saveBarberClientEdit: saveBarberClientEditInfo,
        getClient: getInfoClient,
        getBarberAppointments: getInfoBarberAppointments,
        searchBarberClients: searchInfoBarberClients,
        getClientHistory: getInfoClientHistory,
        getBarberWalkInClient: getInfoBarberGetWalkInClient/*,
        get: function(clientId) {
            for (var i = 0; i < clients.length; i++) {
              if (clients[i].id === parseInt(clientId)) {
                return clients[i];
              }
            }
            return null;
        }
        */
    };
 })

.factory('Services', function($http, $rootScope, $stateParams) {
  // Might use a resource here that returns a JSON array


    var getInfoBarbersServices = function($params) {
        //return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })

        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
            method: 'POST',
            url: wsUrlBase + wsBarberServices + wsExt,
            data: 'barber_id=' + $params.barber_id,
            //timeout : 1000,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    //obtener los servicios que puedo agregar, es decir, del listado total los que no tiene agregados el barbero
    var getInfoAvailableServices = function($params) {

        return $http({
            method: 'POST',
            url: wsUrlBase + wsAvailableService + wsExt,
            data: 'barber_id=' + $params.barber_id,
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    var getInfoAllServices = function($params) {
        //return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })

        //return $http.get(wsUrlBase + "services_list" + wsExt);
        return $http({
            method: 'POST',
            url: wsUrlBase + wsServicesList + wsExt,
            data: 'barber_id=' + $params.barber_id,
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    var getInfoService = function($params) {

        return $http({
            method: 'POST',
            url: wsUrlBase + wsGetService + wsExt,
            data: 'barber_id=' + $params.barber_id + '&service_id=' + $params.service_id + '&nothing=',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    var deleteInfoService = function($params) {
        
        //console.log($params);

        return $http({
            method: 'POST',
            url: wsUrlBase + wsDeleteService + wsExt,
            data: 'barber_id=' + $params.barber_id + '&service_id=' + $params.service_id + "&nothing=",

            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s   
        });
    };
    
    var saveInfoBarberServices = function($data) {
        
        var accion = '';
        
        if( $data.accion=='add' )
            accion = wsAddBarberServices;
        else if( $data.accion=='edit' )
            accion = wsEditBarberServices;
        
        //console.log(wsUrlBase + accion + wsExt);
        
        return $http({
            method: 'POST',
            url: wsUrlBase + accion + wsExt,
            //data: 'barber_id=' + $stateParams.barber_id + '?service_id=' + $stateParams.service_id,
            data: (
                    'barber_id='    + $data.barber_id   +
                    '&service_id='  + $data.service_id + 
                    '&precio='      + $data.precio      +
                    '&puntos='      + $data.puntos + 
                    '&titulo='      + encodeURIComponent($data.titulo) +
                    '&duracion='      + $data.duracion + 
                    //"&linkdepago="  + encodeURIComponent($data.linkdepago) +
                    "&nothing="
                    /*+ '&simbolomoneda=' + encodeURIComponent($data.currency) + '  '*/),
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 60000//60s   
        });
    };
    
    /*
    var saveInfoService = function($data) {
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsSaveService + wsExt,
            data: 'barber_id='  + $data.barber_id   + '&service_id='    + $data.service_id + 
                  '&precio='    + $data.precio       + '&puntos=' + $data.puntos + "&nothing=",
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }   
        });
    };
    */
    
    return {
        getBarberServices: getInfoBarbersServices,
        getAllServices: getInfoAllServices,
        saveBarberServices: saveInfoBarberServices,
        getAvailableServices: getInfoAvailableServices,
        deleteService: deleteInfoService,
        getService: getInfoService
    };
 })
 
 
 .factory('Posts', function($http, $rootScope, $stateParams) {
    var savePost = function($data) {
        return $http({
            method: 'POST',
            url: wsUrlBase + wsSavePost + wsExt,
            data: 'barber_id=' + $data.barber_id + 
                    '&post_id=' + $data.post_id +
                    '&type_post=' + $data.type_post  + 
                    '&type_content=' + $data.type_content + 
                    '&days=' + $data.days + 
                    '&content_post=' + encodeURIComponent($data.content_post) + 
                    '&descripcion=' + encodeURIComponent($data.descripcion) + 
                    '&locale=' + $data.locale + 
                    "&nothing=",
            //timeout : 1000,
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000//30s
        });
    };   
    var getListPosts = function($params) {
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsPostsList + wsExt,
            data: 'locale=' + $params.locale +
                  '&barber_id=' + $params.barber_id + 
                  '&type_content=' + $params.type_content + 
                  '&criterio=' + $params.criterio + 
                  '&nothing=',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000   
        });
    };
    
    var setLikePosts = function($params) {
        
        return $http({
            method: 'POST',
            url: wsUrlBase + wsPostsLike + wsExt,
            data: 'post_id=' + $params.post_id  +
                   '&likes=' + $params.likes +'&nothing=',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            timeout: 30000   
        });
    };
    
    var delete_post = function($data) {
       
        return $http({
            method: 'POST',
            url: wsUrlBase +wsPostsDelete + wsExt,
            data:   (
                        "post_id=" + $data.post_id + 
                        "&locale=" + $data.locale + 
                        "&nothing="
                    ),
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }   
        });
    };
    return {        
        savePost: savePost,
        getPosts: getListPosts,
        setLike: setLikePosts,
        delete: delete_post,
    };
 })
;