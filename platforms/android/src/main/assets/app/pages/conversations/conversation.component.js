"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
<<<<<<< HEAD
var nativescript_mqtt_1 = require("nativescript-mqtt");
=======
require("nativescript-websockets");
>>>>>>> e37c9462b14218576633a8558e986615b78f65c6
var application_settings_1 = require("application-settings");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("Fab", function () { return require("nativescript-floatingactionbutton").Fab; });
var restApi_service_1 = require("../../restApi.service");
var commonLib_1 = require("../../commonLib");
var Conversation = (function () {
    function Conversation(route, _router, restApi, zone) {
        this.route = route;
        this._router = _router;
        this.restApi = restApi;
        this.zone = zone;
        this.devKey = '';
        this.convos = [];
        this.newConvos = [];
        this.userDetails = [];
        this.groupFeeds = [];
        this.dispName = [];
        this.profilePic = [];
        this.groupDetails = [];
<<<<<<< HEAD
        this.token = application_settings_1.getString("userKey");
        this.mqtt_host = "apps-test.applozic.com";
        this.mqtt_port = 15677;
        this.mqtt_useSSL = true;
        this.mqtt_path = "/ws";
        this.mqtt_username = "guest";
        this.mqtt_password = "guest";
        this.mqtt_topic = this.token;
        this.options = {
            host: this.mqtt_host,
            port: this.mqtt_port,
            useSSL: this.mqtt_useSSL,
            path: this.mqtt_path
        };
        this.mqtt_client = new nativescript_mqtt_1.MQTTClient(this.options);
=======
>>>>>>> e37c9462b14218576633a8558e986615b78f65c6
        this.account = {};
        this.fabTap = function (args) {
            this._router.navigate(["/startNew", this.devKey]);
            console.log('tapped');
        };
        this.timeSince = commonLib_1.getTime;
        this.setupHandlers();
    }
    Conversation.prototype.ngOnInit = function () {
        var _this = this;
        console.log("conversations onInit");
        this.devKey = this.route.snapshot.params['devKey'];
        var data = {
            devKey: this.devKey
        };
        this.restApi.convoList(data).subscribe(function (res) {
            console.log("res");
            _this.convos = res.message;
            _this.userDetails = res.userDetails;
            _this.groupFeeds = res.groupFeeds;
            commonLib_1.convoDetails(_this.userDetails, _this.groupFeeds);
            _this.dispName = commonLib_1.dispName;
            _this.profilePic = commonLib_1.profilePic;
            _this.groupDetails = commonLib_1.groupDetails;
            console.log(_this.groupFeeds.length);
            console.log(commonLib_1.groupDetails.length);
        }, function (err) {
            console.log("err");
            console.log(err);
        });
        this.connect();
    };
    Conversation.prototype.connect = function () {
        try {
            this.mqtt_client.connect(this.mqtt_username, this.mqtt_password);
            console.log("Connencting...");
        }
        catch (e) {
            console.log("Caught error IN connect: " + e);
        }
    };
    Conversation.prototype.subscribe = function () {
        try {
            this.mqtt_client.subscribe(this.mqtt_topic);
            console.log("Subscribed...");
        }
        catch (e) {
            console.log("Caught error In subscribe: " + e);
        }
    };
    Conversation.prototype.setupHandlers = function () {
        var _this = this;
        this.mqtt_client.onConnectionFailure.on(function (err) {
            console.log("Connection failed: ");
            console.dir(err);
        });
        this.mqtt_client.onConnectionSuccess.on(function () {
            console.log("Connected successfully!");
            _this.subscribe();
        });
        this.mqtt_client.onConnectionLost.on(function (err) {
            console.log("Connection lost: " + err);
        });
        this.mqtt_client.onMessageArrived.on(function (message) {
            console.log("Message received: ");
            console.log(message.payload);
            var newMessage = JSON.parse(message.payload);
            var newConvos = _this.convos;
            for (var i = 0; i < newConvos.length; i++) {
                if (newConvos[i].to == newMessage.message.to) {
                    console.dir(newConvos[i]);
                    newConvos[i] = newMessage.message;
                    _this.convos = newConvos;
                    //  delete newConvos[i];
                    //  let msg = [] ;
                    //  msg[0]  = newMessage.message;
                    //  newConvos = msg.concat(newConvos);
                    //  newConvos.push(newMessage.message);
                    console.dir(newConvos[i]);
                    //  this.convos[i] = newMessage.message;
                }
            }
        });
    };
    Conversation.prototype.chatOpen = function (user) {
        var id = "userId";
        var whose = user.to;
        if (user.groupId) {
            id = "groupId";
            whose = user.groupId;
        }
        this._router.navigate(["/chatWith", id, whose]);
    };
    Conversation.prototype.loadMoreItems = function () {
        var _this = this;
        var endTime = this.convos[this.convos.length - 1].createdAtTime;
        this.devKey = this.route.snapshot.params['devKey'];
        var data = {
            devKey: this.devKey,
            endTime: endTime
        };
        console.log("Loaded");
        this.restApi.convoList(data).subscribe(function (res) {
            _this.newConvos = res.message;
            _this.userDetails = res.userDetails;
            _this.groupFeeds = res.groupFeeds;
            console.dir(_this.newConvos);
            commonLib_1.convoDetails(_this.userDetails, _this.groupFeeds);
            _this.dispName = commonLib_1.dispName;
            _this.profilePic = commonLib_1.profilePic;
            _this.groupDetails = commonLib_1.groupDetails;
            _this.convos = _this.convos.concat(_this.newConvos);
        }, function (err) {
            console.log("err");
            console.log(err);
        });
    };
    Conversation.prototype.logOut = function () {
        this.isTurnedOn = application_settings_1.getBoolean("isTurnedOn");
        if (this.isTurnedOn) {
            application_settings_1.setBoolean("isTurnedOn", false);
            this.account = {};
            application_settings_1.setString("account", JSON.stringify(this.account));
            this._router.navigate(["/login"]);
        }
    };
    return Conversation;
}());
Conversation = __decorate([
    core_1.Component({
        selector: "conversation",
        templateUrl: "pages/conversations/conversation.html",
        styleUrls: ["pages/conversations/conversation.css"]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, restApi_service_1.RestApiService, core_1.NgZone])
], Conversation);
exports.Conversation = Conversation;
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUU7QUFFckUsMENBQXVFO0FBRXZFLHVEQUE2QztBQUk3Qyw2REFVOEI7QUFHOUIsMEVBQXdFO0FBQ3hFLGtDQUFlLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxHQUFHLEVBQWhELENBQWdELENBQUMsQ0FBQztBQUUvRSx5REFBdUQ7QUFDdkQsNkNBQTRGO0FBTzVGLElBQWEsWUFBWTtJQW9DckIsc0JBQW9CLEtBQXFCLEVBQVUsT0FBZSxFQUFTLE9BQXVCLEVBQVUsSUFBWTtRQUFwRyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFuQ3hILFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsVUFBSyxHQUFHLGdDQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFNUIsY0FBUyxHQUFXLHdCQUF3QixDQUFDO1FBQzdDLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFDMUIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsY0FBUyxHQUFXLEtBQUssQ0FBQztRQUMxQixrQkFBYSxHQUFXLE9BQU8sQ0FBQztRQUNoQyxrQkFBYSxHQUFXLE9BQU8sQ0FBQztRQUNoQyxlQUFV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SUFPRCw2QkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxpQ0FBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO1lBQ2hCLGlDQUFVLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLGdDQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBRSxDQUFBO1FBQ3RDLENBQUM7SUFDSCxDQUFDO0lBRUgsbUJBQUM7QUFBRCxDQUFDLEFBckxELElBcUxDO0FBckxZLFlBQVk7SUFMeEIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSx1Q0FBdUM7UUFDcEQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7S0FDcEQsQ0FBQztxQ0FxQzZCLHVCQUFjLEVBQW1CLGVBQU0sRUFBa0IsZ0NBQWMsRUFBZ0IsYUFBTTtHQXBDL0csWUFBWSxDQXFMeEI7QUFyTFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIFBhcmFtcywgRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7TVFUVENsaWVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tcXR0XCI7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gXCJuYXRpdmVzY3JpcHQtbXF0dC9jb21tb25cIjtcblxuXG5pbXBvcnQge1xuICAgIGdldEJvb2xlYW4sXG4gICAgc2V0Qm9vbGVhbixcbiAgICBnZXROdW1iZXIsXG4gICAgc2V0TnVtYmVyLFxuICAgIGdldFN0cmluZyxcbiAgICBzZXRTdHJpbmcsXG4gICAgaGFzS2V5LFxuICAgIHJlbW92ZSxcbiAgICBjbGVhclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xucmVnaXN0ZXJFbGVtZW50KFwiRmFiXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b25cIikuRmFiKTtcblxuaW1wb3J0IHsgUmVzdEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9yZXN0QXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgZGlzcE5hbWUsIHByb2ZpbGVQaWMsIGdyb3VwRGV0YWlscywgY29udm9EZXRhaWxzLCBnZXRUaW1lIH0gZnJvbSAnLi4vLi4vY29tbW9uTGliJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImNvbnZlcnNhdGlvblwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9jb252ZXJzYXRpb25zL2NvbnZlcnNhdGlvbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvY29udmVyc2F0aW9ucy9jb252ZXJzYXRpb24uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENvbnZlcnNhdGlvbiB7XG4gICAgZGV2S2V5ID0gJyc7XG4gICAgY29udm9zID0gW107XG4gICAgbmV3Q29udm9zID0gW107XG4gICAgdXNlckRldGFpbHMgPSBbXTtcbiAgICBncm91cEZlZWRzID0gW107XG4gICAgZGlzcE5hbWUgPSBbXTtcbiAgICBwcm9maWxlUGljID0gW107XG4gICAgZ3JvdXBEZXRhaWxzID0gW107XG5cbiAgICB0b2tlbiA9IGdldFN0cmluZyhcInVzZXJLZXlcIilcblxuICAgIG1xdHRfaG9zdDogc3RyaW5nID0gXCJhcHBzLXRlc3QuYXBwbG96aWMuY29tXCI7XG4gICAgbXF0dF9wb3J0OiBudW1iZXIgPSAxNTY3NztcbiAgICBtcXR0X3VzZVNTTDogYm9vbGVhbiA9IHRydWU7XG4gICAgbXF0dF9wYXRoOiBzdHJpbmcgPSBcIi93c1wiO1xuICAgIG1xdHRfdXNlcm5hbWU6IHN0cmluZyA9IFwiZ3Vlc3RcIjtcbiAgICBtcXR0X3Bhc3N3b3JkOiBzdHJpbmcgPSBcImd1ZXN0XCI7XG4gICAgbXF0dF90b3BpYzogc3RyaW5nID0gdGhpcy50b2tlbjtcblxuICAgIG9wdGlvbnMgPSB7XG4gICAgICAgIGhvc3Q6IHRoaXMubXF0dF9ob3N0LFxuICAgICAgICBwb3J0OiB0aGlzLm1xdHRfcG9ydCxcbiAgICAgICAgdXNlU1NMOiB0aGlzLm1xdHRfdXNlU1NMLFxuICAgICAgICBwYXRoOiB0aGlzLm1xdHRfcGF0aFxuICAgIH07XG5cbiAgICBtcXR0X2NsaWVudDogTVFUVENsaWVudCA9IG5ldyBNUVRUQ2xpZW50KHRoaXMub3B0aW9ucyk7XG5cbiAgICBwcml2YXRlIHNvY2tldDogYW55O1xuICAgIFxuICAgIHB1YmxpYyBpc1R1cm5lZE9uOiBib29sZWFuO1xuICAgIHB1YmxpYyBhY2NvdW50ID0ge31cblxuICAgIHB1YmxpYyB0aW1lU2luY2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHB1YmxpYyByZXN0QXBpOiBSZXN0QXBpU2VydmljZSwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHsgXG4gICAgICAgIHRoaXMudGltZVNpbmNlID0gZ2V0VGltZTtcbiAgICAgICAgdGhpcy5zZXR1cEhhbmRsZXJzKCk7XG4gICAgfVxuICAgIFxuICAgIG5nT25Jbml0KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29udmVyc2F0aW9ucyBvbkluaXRcIik7XG4gICAgICAgIHRoaXMuZGV2S2V5ID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2RldktleSddO1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIGRldktleSA6IHRoaXMuZGV2S2V5XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc3RBcGkuY29udm9MaXN0KGRhdGEpLnN1YnNjcmliZSggcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzXCIpO1xuICAgICAgICAgICAgdGhpcy5jb252b3MgPSByZXMubWVzc2FnZTtcbiAgICAgICAgICAgIHRoaXMudXNlckRldGFpbHMgPSByZXMudXNlckRldGFpbHM7XG4gICAgICAgICAgICB0aGlzLmdyb3VwRmVlZHMgPSByZXMuZ3JvdXBGZWVkcztcblxuICAgICAgICAgICAgY29udm9EZXRhaWxzKHRoaXMudXNlckRldGFpbHMsIHRoaXMuZ3JvdXBGZWVkcyk7XG4gICAgICAgICAgICB0aGlzLmRpc3BOYW1lID0gZGlzcE5hbWU7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVQaWMgPSAgcHJvZmlsZVBpYztcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBEZXRhaWxzID0gZ3JvdXBEZXRhaWxzO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdyb3VwRmVlZHMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdyb3VwRGV0YWlscy5sZW5ndGgpO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xuXG4gICAgfVxuXG4gICAgY29ubmVjdCgpIDogdm9pZCB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRoaXMubXF0dF9jbGllbnQuY29ubmVjdCh0aGlzLm1xdHRfdXNlcm5hbWUsIHRoaXMubXF0dF9wYXNzd29yZCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lbmN0aW5nLi4uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhdWdodCBlcnJvciBJTiBjb25uZWN0OiBcIiArIGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKCkgOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMubXF0dF9jbGllbnQuc3Vic2NyaWJlKHRoaXMubXF0dF90b3BpYyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1YnNjcmliZWQuLi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F1Z2h0IGVycm9yIEluIHN1YnNjcmliZTogXCIgKyBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldHVwSGFuZGxlcnMoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLm1xdHRfY2xpZW50Lm9uQ29ubmVjdGlvbkZhaWx1cmUub24oKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGZhaWxlZDogXCIpO1xuICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tcXR0X2NsaWVudC5vbkNvbm5lY3Rpb25TdWNjZXNzLm9uKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHN1Y2Nlc3NmdWxseSFcIik7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1xdHRfY2xpZW50Lm9uQ29ubmVjdGlvbkxvc3Qub24oKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGxvc3Q6IFwiICsgZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tcXR0X2NsaWVudC5vbk1lc3NhZ2VBcnJpdmVkLm9uKChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2UgcmVjZWl2ZWQ6IFwiICk7XG4gICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgICAgICBsZXQgbmV3TWVzc2FnZSA9IEpTT04ucGFyc2UobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgICAgICBsZXQgbmV3Q29udm9zID0gdGhpcy5jb252b3M7XG4gICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bmV3Q29udm9zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgaWYobmV3Q29udm9zW2ldLnRvID09IG5ld01lc3NhZ2UubWVzc2FnZS50byl7XG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihuZXdDb252b3NbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgbmV3Q29udm9zW2ldID0gbmV3TWVzc2FnZS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252b3MgPSBuZXdDb252b3M7XG4gICAgICAgICAgICAgICAgICAgIC8vICBkZWxldGUgbmV3Q29udm9zW2ldO1xuICAgICAgICAgICAgICAgICAgICAvLyAgbGV0IG1zZyA9IFtdIDtcbiAgICAgICAgICAgICAgICAgICAgLy8gIG1zZ1swXSAgPSBuZXdNZXNzYWdlLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIC8vICBuZXdDb252b3MgPSBtc2cuY29uY2F0KG5ld0NvbnZvcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vICBuZXdDb252b3MucHVzaChuZXdNZXNzYWdlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIobmV3Q29udm9zW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gIHRoaXMuY29udm9zW2ldID0gbmV3TWVzc2FnZS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICBjaGF0T3Blbih1c2VyKXtcbiAgICBsZXQgaWQgPSBcInVzZXJJZFwiO1xuICAgIGxldCB3aG9zZSA9IHVzZXIudG87XG4gICAgaWYodXNlci5ncm91cElkKXtcbiAgICAgICAgaWQgPSBcImdyb3VwSWRcIjtcbiAgICAgICAgd2hvc2UgPSB1c2VyLmdyb3VwSWQ7XG4gICAgfVxuICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvY2hhdFdpdGhcIixpZCx3aG9zZV0pO1xuICB9XG5cbiAgbG9hZE1vcmVJdGVtcygpe1xuICAgICAgbGV0IGVuZFRpbWUgPSB0aGlzLmNvbnZvc1t0aGlzLmNvbnZvcy5sZW5ndGgtMV0uY3JlYXRlZEF0VGltZTtcbiAgICAgIHRoaXMuZGV2S2V5ID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2RldktleSddO1xuICAgICAgICBcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBkZXZLZXkgOiB0aGlzLmRldktleSxcbiAgICAgICAgICAgIGVuZFRpbWU6IGVuZFRpbWVcbiAgICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJMb2FkZWRcIik7XG4gICAgICB0aGlzLnJlc3RBcGkuY29udm9MaXN0KGRhdGEpLnN1YnNjcmliZSggcmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMubmV3Q29udm9zID0gcmVzLm1lc3NhZ2U7XG4gICAgICAgICAgICB0aGlzLnVzZXJEZXRhaWxzID0gcmVzLnVzZXJEZXRhaWxzO1xuICAgICAgICAgICAgdGhpcy5ncm91cEZlZWRzID0gcmVzLmdyb3VwRmVlZHM7XG5cbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKHRoaXMubmV3Q29udm9zKTtcbiAgICAgICAgICAgIGNvbnZvRGV0YWlscyh0aGlzLnVzZXJEZXRhaWxzLCB0aGlzLmdyb3VwRmVlZHMpO1xuICAgICAgICAgICAgdGhpcy5kaXNwTmFtZSA9IGRpc3BOYW1lO1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlUGljID0gIHByb2ZpbGVQaWM7XG4gICAgICAgICAgICB0aGlzLmdyb3VwRGV0YWlscyA9IGdyb3VwRGV0YWlscztcbiAgICAgICAgICAgIHRoaXMuY29udm9zID0gdGhpcy5jb252b3MuY29uY2F0KHRoaXMubmV3Q29udm9zKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSlcbiAgfVxuXG4gIGZhYlRhcCA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcIi9zdGFydE5ld1wiLHRoaXMuZGV2S2V5XSk7XG4gICAgIGNvbnNvbGUubG9nKCd0YXBwZWQnKTtcbiAgfVxuXG4gIGxvZ091dCgpe1xuICAgIHRoaXMuaXNUdXJuZWRPbiA9IGdldEJvb2xlYW4oXCJpc1R1cm5lZE9uXCIpO1xuICAgIGlmKHRoaXMuaXNUdXJuZWRPbil7XG4gICAgICAgIHNldEJvb2xlYW4oXCJpc1R1cm5lZE9uXCIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5hY2NvdW50ID0ge307XG4gICAgICAgIHNldFN0cmluZyhcImFjY291bnRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5hY2NvdW50KSk7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0gKVxuICAgIH1cbiAgfVxuXG59Il19
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUU7QUFFckUsMENBQXVFO0FBQ3ZFLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRW5DLDZEQVU4QjtBQUc5QiwwRUFBd0U7QUFDeEUsa0NBQWUsQ0FBQyxLQUFLLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLEdBQUcsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDO0FBRS9FLHlEQUF1RDtBQUN2RCw2Q0FBNEY7QUFPNUYsSUFBYSxZQUFZO0lBaUJyQixzQkFBb0IsS0FBcUIsRUFBVSxPQUFlLEVBQVMsT0FBdUIsRUFBVSxJQUFZO1FBQXBHLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWhCeEgsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUtYLFlBQU8sR0FBRyxFQUFFLENBQUE7UUFpR3JCLFdBQU0sR0FBRyxVQUFTLElBQUk7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUE7UUEv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b21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIFBhcmFtcywgRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5yZXF1aXJlKFwibmF0aXZlc2NyaXB0LXdlYnNvY2tldHNcIik7XG5cbmltcG9ydCB7XG4gICAgZ2V0Qm9vbGVhbixcbiAgICBzZXRCb29sZWFuLFxuICAgIGdldE51bWJlcixcbiAgICBzZXROdW1iZXIsXG4gICAgZ2V0U3RyaW5nLFxuICAgIHNldFN0cmluZyxcbiAgICBoYXNLZXksXG4gICAgcmVtb3ZlLFxuICAgIGNsZWFyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5cbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJGYWJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1mbG9hdGluZ2FjdGlvbmJ1dHRvblwiKS5GYWIpO1xuXG5pbXBvcnQgeyBSZXN0QXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3Jlc3RBcGkuc2VydmljZSc7XG5pbXBvcnQgeyBkaXNwTmFtZSwgcHJvZmlsZVBpYywgZ3JvdXBEZXRhaWxzLCBjb252b0RldGFpbHMsIGdldFRpbWUgfSBmcm9tICcuLi8uLi9jb21tb25MaWInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29udmVyc2F0aW9uXCIsXG4gIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2NvbnZlcnNhdGlvbnMvY29udmVyc2F0aW9uLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jb252ZXJzYXRpb25zL2NvbnZlcnNhdGlvbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ29udmVyc2F0aW9uIHtcbiAgICBkZXZLZXkgPSAnJztcbiAgICBjb252b3MgPSBbXTtcbiAgICBuZXdDb252b3MgPSBbXTtcbiAgICB1c2VyRGV0YWlscyA9IFtdO1xuICAgIGdyb3VwRmVlZHMgPSBbXTtcbiAgICBkaXNwTmFtZSA9IFtdO1xuICAgIHByb2ZpbGVQaWMgPSBbXTtcbiAgICBncm91cERldGFpbHMgPSBbXTtcblxuICAgIHByaXZhdGUgc29ja2V0OiBhbnk7XG4gICAgXG4gICAgcHVibGljIGlzVHVybmVkT246IGJvb2xlYW47XG4gICAgcHVibGljIGFjY291bnQgPSB7fVxuXG4gICAgcHVibGljIHRpbWVTaW5jZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHVibGljIHJlc3RBcGk6IFJlc3RBcGlTZXJ2aWNlLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkgeyBcbiAgICAgICAgdGhpcy50aW1lU2luY2UgPSBnZXRUaW1lO1xuICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3c3M6Ly9hcHBzLXRlc3QuYXBwbG96aWMuY29tOjE1Njc3L3dzXCIsIFtdKTtcbiAgICB9XG4gICAgXG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjb252ZXJzYXRpb25zIG9uSW5pdFwiKTtcbiAgICAgICAgdGhpcy5kZXZLZXkgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snZGV2S2V5J107XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgZGV2S2V5IDogdGhpcy5kZXZLZXlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzdEFwaS5jb252b0xpc3QoZGF0YSkuc3Vic2NyaWJlKCByZXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNcIik7XG4gICAgICAgICAgICB0aGlzLmNvbnZvcyA9IHJlcy5tZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy51c2VyRGV0YWlscyA9IHJlcy51c2VyRGV0YWlscztcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBGZWVkcyA9IHJlcy5ncm91cEZlZWRzO1xuXG4gICAgICAgICAgICBjb252b0RldGFpbHModGhpcy51c2VyRGV0YWlscywgdGhpcy5ncm91cEZlZWRzKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcE5hbWUgPSBkaXNwTmFtZTtcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZVBpYyA9ICBwcm9maWxlUGljO1xuICAgICAgICAgICAgdGhpcy5ncm91cERldGFpbHMgPSBncm91cERldGFpbHM7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JvdXBGZWVkcy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZ3JvdXBEZXRhaWxzLmxlbmd0aCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVyclwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic29ja2V0IG9wZW5cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzb2NrZXQgTWVzc2FnZSByZWNlaXZlZFwiKTtcbiAgICAgICAgICAgICAgICAvLyBsZXQgcmVzID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihcInJlc1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91IGhhdmUgYmVlbiBkaXNjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgc29ja2V0IGhhZCBhbiBlcnJvclwiLCBldmVudC5lcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gIGNoYXRPcGVuKHVzZXIpe1xuICAgIGxldCBpZCA9IFwidXNlcklkXCI7XG4gICAgbGV0IHdob3NlID0gdXNlci50bztcbiAgICBpZih1c2VyLmdyb3VwSWQpe1xuICAgICAgICBpZCA9IFwiZ3JvdXBJZFwiO1xuICAgICAgICB3aG9zZSA9IHVzZXIuZ3JvdXBJZDtcbiAgICB9XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcIi9jaGF0V2l0aFwiLGlkLHdob3NlXSk7XG4gIH1cblxuICBsb2FkTW9yZUl0ZW1zKCl7XG4gICAgICBsZXQgZW5kVGltZSA9IHRoaXMuY29udm9zW3RoaXMuY29udm9zLmxlbmd0aC0xXS5jcmVhdGVkQXRUaW1lO1xuICAgICAgdGhpcy5kZXZLZXkgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snZGV2S2V5J107XG4gICAgICAgIFxuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIGRldktleSA6IHRoaXMuZGV2S2V5LFxuICAgICAgICAgICAgZW5kVGltZTogZW5kVGltZVxuICAgICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcIkxvYWRlZFwiKTtcbiAgICAgIHRoaXMucmVzdEFwaS5jb252b0xpc3QoZGF0YSkuc3Vic2NyaWJlKCByZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZXdDb252b3MgPSByZXMubWVzc2FnZTtcbiAgICAgICAgICAgIHRoaXMudXNlckRldGFpbHMgPSByZXMudXNlckRldGFpbHM7XG4gICAgICAgICAgICB0aGlzLmdyb3VwRmVlZHMgPSByZXMuZ3JvdXBGZWVkcztcblxuICAgICAgICAgICAgY29uc29sZS5kaXIodGhpcy5uZXdDb252b3MpO1xuICAgICAgICAgICAgY29udm9EZXRhaWxzKHRoaXMudXNlckRldGFpbHMsIHRoaXMuZ3JvdXBGZWVkcyk7XG4gICAgICAgICAgICB0aGlzLmRpc3BOYW1lID0gZGlzcE5hbWU7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVQaWMgPSAgcHJvZmlsZVBpYztcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBEZXRhaWxzID0gZ3JvdXBEZXRhaWxzO1xuICAgICAgICAgICAgdGhpcy5jb252b3MgPSB0aGlzLmNvbnZvcy5jb25jYXQodGhpcy5uZXdDb252b3MpO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuICB9XG5cbiAgZmFiVGFwID0gZnVuY3Rpb24oYXJncykge1xuICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1wiL3N0YXJ0TmV3XCIsdGhpcy5kZXZLZXldKTtcbiAgICAgY29uc29sZS5sb2coJ3RhcHBlZCcpO1xuICB9XG5cbiAgbG9nT3V0KCl7XG4gICAgdGhpcy5pc1R1cm5lZE9uID0gZ2V0Qm9vbGVhbihcImlzVHVybmVkT25cIik7XG4gICAgaWYodGhpcy5pc1R1cm5lZE9uKXtcbiAgICAgICAgc2V0Qm9vbGVhbihcImlzVHVybmVkT25cIiwgZmFsc2UpO1xuICAgICAgICB0aGlzLmFjY291bnQgPSB7fTtcbiAgICAgICAgc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmFjY291bnQpKTtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcIi9sb2dpblwiXSApXG4gICAgfVxuICB9XG5cbn0iXX0=
>>>>>>> e37c9462b14218576633a8558e986615b78f65c6
