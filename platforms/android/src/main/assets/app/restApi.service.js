"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var application_settings_1 = require("application-settings");
var commonLib_1 = require("./commonLib");
var RestApiService = (function () {
    function RestApiService(http) {
        this.http = http;
        this.auth = '';
        this.deviceKey = '';
        this.token = '';
        this.appId = '';
        this.userId = '';
        this.APP_URL = 'https://apps-test.applozic.com';
        this.account = {
            "appId": '',
            "userId": '',
            "pwd": ''
        };
    }
    RestApiService.prototype.login = function (data) {
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Application-Key': this.appId });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log("http request for login");
        console.log(data.appId + " " + data.userId + " " + data.pwd);
        this.appId = data.appId;
        this.userId = data.userId;
        this.token = data.pwd;
        return this.http.post(this.APP_URL + '/v2/tab/initialize.page', {
            applicationId: this.appId,
            userId: this.userId,
            password: data.pwd,
            enableEncryption: true,
            displayName: '',
            contactNumber: '',
            appVersionCode: 108,
            authenticationTypeId: 1
        }, options).map(function (res) { return res.json(); });
    };
    RestApiService.prototype.convoList = function (data) {
        this.isTurnedOn = application_settings_1.getBoolean("isTurnedOn");
        if (this.isTurnedOn) {
            console.log("Account Settings moved");
            this.account = JSON.parse(application_settings_1.getString("account"));
            console.dir(this.account);
            this.appId = this.account.appId;
            this.userId = this.account.userId;
            this.token = this.account.pwd;
        }
        var enc = this.userId + ':' + data.devKey;
        this.auth = commonLib_1.Base64.encode(enc);
        this.deviceKey = data.devKey;
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json',
            'UserId-Enabled': true, 'Application-Key': this.appId, 'Access-Token': this.token,
            'Device-Key': this.deviceKey, 'Authorization': 'Basic ' + this.auth });
        var options = new http_1.RequestOptions({ headers: headers });
        var reqData = '';
        if (data.endTime) {
            reqData += '&endTime=' + data.endTime;
        }
        reqData += '&mainPageSize=60';
        console.log("http request for convoList");
        console.log(this.deviceKey + " " + this.auth);
        return this.http.get(this.APP_URL + '/rest/ws/message/list' + '?startIndex=0' + reqData, options)
            .map(function (res) { return res.json(); });
    };
    RestApiService.prototype.chat = function (data) {
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json',
            'UserId-Enabled': true, 'Application-Key': this.appId, 'Access-Token': this.token,
            'Device-Key': this.deviceKey, 'Authorization': 'Basic ' + this.auth });
        var options = new http_1.RequestOptions({ headers: headers });
        var reqData = '';
        reqData += "&" + data.id + "=" + data.whose;
        if (data.endTime) {
            reqData += '&endTime=' + data.endTime;
        }
        reqData += '&pageSize=30';
        return this.http.get(this.APP_URL + '/rest/ws/message/list' + '?startIndex=0' + reqData, options)
            .map(function (res) { return res.json(); });
    };
    RestApiService.prototype.send = function (data) {
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json',
            'UserId-Enabled': true, 'Application-Key': this.appId, 'Access-Token': this.token,
            'Device-Key': this.deviceKey, 'Authorization': 'Basic ' + this.auth });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.APP_URL + '/rest/ws/message/send', {
            contentType: 0,
            // key:"sd4py",
            message: data.message,
            metadata: {},
            source: 5,
            to: data.whose,
            type: 5
        }, options).map(function (res) { return res.json(); });
    };
    RestApiService.prototype.startNew = function () {
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json',
            'UserId-Enabled': true, 'Application-Key': this.appId, 'Access-Token': this.token,
            'Device-Key': this.deviceKey, 'Authorization': 'Basic ' + this.auth });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.APP_URL + '/rest/ws/user/filter?startIndex=0&pageSize=30&orderBy=1', options)
            .map(function (res) { return res.json(); });
    };
    RestApiService.prototype.createGroup = function (data) {
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json',
            'UserId-Enabled': true, 'Application-Key': this.appId, 'Access-Token': this.token,
            'ofUserId': data.adminId,
            'Device-Key': this.deviceKey, 'Authorization': 'Basic ' + this.auth });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.APP_URL + '/rest/ws/group/v2/create', {
            groupName: data.groupName,
            groupMemberList: data.members,
        }, options).map(function (res) { return res.json(); });
    };
    RestApiService.prototype.deleteMessage = function (data) {
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'key': data.key,
            'UserId-Enabled': true, 'Application-Key': this.appId, 'Access-Token': this.token,
            'Device-Key': this.deviceKey, 'Authorization': 'Basic ' + this.auth });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.APP_URL + '/rest/ws/message/delete', options)
            .map(function (res) { return res.json(); });
    };
    RestApiService.prototype.deleteConversation = function (data) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'UserId-Enabled': true, 'Application-Key': this.appId, 'Access-Token': this.token,
            'Device-Key': this.deviceKey, 'Authorization': 'Basic ' + this.auth });
        var reqData = '';
        reqData += "?" + data.id + "=" + data.whose;
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(this.appId + " " + " " + this.token + " " + this.deviceKey + " " + this.auth);
        return this.http.get(this.APP_URL + '/rest/ws/message/delete/conversation' + reqData, options)
            .map(function (res) { return res; });
    };
    RestApiService.prototype.addMember = function (data) {
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json',
            'UserId-Enabled': true, 'Application-Key': this.appId, 'Access-Token': this.token,
            'ofUserId': data.adminId,
            'Device-Key': this.deviceKey, 'Authorization': 'Basic ' + this.auth });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.APP_URL + '/rest/ws/group/add/member', {
            userId: this.userId,
            clientGroupId: data.clientGroupId
        }, options).map(function (res) { return res.json(); });
    };
    RestApiService.prototype.removeMember = function (data) {
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json',
            'UserId-Enabled': true, 'Application-Key': this.appId, 'Access-Token': this.token,
            'ofUserId': data.adminId,
            'Device-Key': this.deviceKey, 'Authorization': 'Basic ' + this.auth });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.APP_URL + '/rest/ws/group/remove/member', {
            userId: this.userId,
            clientGroupId: data.clientGroupId
        }, options).map(function (res) { return res.json(); });
    };
    RestApiService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    return RestApiService;
}());
RestApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RestApiService);
exports.RestApiService = RestApiService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdEFwaS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdEFwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUN4RSw4QkFBcUM7QUFDckMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUcvQiw2REFVOEI7QUFFOUIseUNBQXFDO0FBR3JDLElBQWEsY0FBYztJQWV6Qix3QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFkOUIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixZQUFPLEdBQUcsZ0NBQWdDLENBQUM7UUFHcEMsWUFBTyxHQUFHO1lBQ2IsT0FBTyxFQUFHLEVBQUU7WUFDWixRQUFRLEVBQUUsRUFBRTtZQUNaLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQTtJQUVnQyxDQUFDO0lBRWxDLDhCQUFLLEdBQUwsVUFBTSxJQUFJO1FBQ1IsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQzNILElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBRXRELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxNQUFNLEdBQUUsR0FBRyxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RCxJ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Q0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQTFMRCxJQTBMQztBQTFMWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBZ0JlLFdBQUk7R0FmbkIsY0FBYyxDQTBMMUI7QUExTFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCB7IFVSTFNlYXJjaFBhcmFtcywgUXVlcnlFbmNvZGVyIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcblxuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbmltcG9ydCB7IEJhc2U2NCB9IGZyb20gJy4vY29tbW9uTGliJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc3RBcGlTZXJ2aWNlIHtcbiAgYXV0aCA9ICcnO1xuICBkZXZpY2VLZXkgPSAnJztcbiAgdG9rZW4gPSAnJztcbiAgYXBwSWQgPSAnJztcbiAgdXNlcklkID0gJyc7XG4gIEFQUF9VUkwgPSAnaHR0cHM6Ly9hcHBzLXRlc3QuYXBwbG96aWMuY29tJztcblxuICBwdWJsaWMgaXNUdXJuZWRPbjogYm9vbGVhbjtcbiAgcHVibGljIGFjY291bnQgPSB7XG4gICAgICBcImFwcElkXCIgOiAnJyxcbiAgICAgIFwidXNlcklkXCI6ICcnLFxuICAgICAgXCJwd2RcIjogJydcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge31cblxuICBsb2dpbihkYXRhKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBwSWR9KTtcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnN9KTtcbiAgXG4gICAgY29uc29sZS5sb2coXCJodHRwIHJlcXVlc3QgZm9yIGxvZ2luXCIpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEuYXBwSWQrXCIgXCIrZGF0YS51c2VySWQgK1wiIFwiKyBkYXRhLnB3ZCk7XG4gICAgdGhpcy5hcHBJZCA9IGRhdGEuYXBwSWQ7XG4gICAgdGhpcy51c2VySWQgPSBkYXRhLnVzZXJJZDtcbiAgICB0aGlzLnRva2VuID0gZGF0YS5wd2Q7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgdGhpcy5BUFBfVVJMICsgJy92Mi90YWIvaW5pdGlhbGl6ZS5wYWdlJyxcbiAgICAge1xuICAgICAgYXBwbGljYXRpb25JZDogdGhpcy5hcHBJZCxcbiAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXG4gICAgICBwYXNzd29yZDogZGF0YS5wd2QsXG4gICAgICBlbmFibGVFbmNyeXB0aW9uOiB0cnVlLFxuICAgICAgZGlzcGxheU5hbWU6JycsXG4gICAgICBjb250YWN0TnVtYmVyOicnLFxuICAgICAgYXBwVmVyc2lvbkNvZGU6IDEwOCxcbiAgICAgIGF1dGhlbnRpY2F0aW9uVHlwZUlkOiAxXG4gICAgICB9LG9wdGlvbnNcbiAgICApLm1hcChyZXMgPT4gPGFueT5yZXMuanNvbigpKTtcbiAgfVxuXG4gIFxuXG4gIGNvbnZvTGlzdChkYXRhKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgXG4gICAgdGhpcy5pc1R1cm5lZE9uID0gZ2V0Qm9vbGVhbihcImlzVHVybmVkT25cIik7XG4gICAgaWYodGhpcy5pc1R1cm5lZE9uKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiQWNjb3VudCBTZXR0aW5ncyBtb3ZlZFwiKTtcbiAgICAgIHRoaXMuYWNjb3VudCA9IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwiYWNjb3VudFwiKSk7XG4gICAgICBjb25zb2xlLmRpcih0aGlzLmFjY291bnQpO1xuICAgICAgdGhpcy5hcHBJZCA9IHRoaXMuYWNjb3VudC5hcHBJZDtcbiAgICAgIHRoaXMudXNlcklkID0gdGhpcy5hY2NvdW50LnVzZXJJZDtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLmFjY291bnQucHdkO1xuICAgIH1cblxuICAgIGxldCBlbmMgPSB0aGlzLnVzZXJJZCsnOicrZGF0YS5kZXZLZXk7XG4gICAgdGhpcy5hdXRoID0gQmFzZTY0LmVuY29kZShlbmMpO1xuICAgIHRoaXMuZGV2aWNlS2V5ID0gZGF0YS5kZXZLZXk7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJywnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVXNlcklkLUVuYWJsZWQnOiB0cnVlLCdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwcElkLCdBY2Nlc3MtVG9rZW4nOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0RldmljZS1LZXknOnRoaXMuZGV2aWNlS2V5LCdBdXRob3JpemF0aW9uJzogJ0Jhc2ljICcrdGhpcy5hdXRofSk7XG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzfSk7XG4gICAgbGV0IHJlcURhdGEgPSAnJztcbiAgICBpZihkYXRhLmVuZFRpbWUpe1xuICAgICAgcmVxRGF0YSArPSAnJmVuZFRpbWU9JytkYXRhLmVuZFRpbWU7XG4gICAgfVxuICAgIHJlcURhdGEgKz0gJyZtYWluUGFnZVNpemU9NjAnO1xuICAgIGNvbnNvbGUubG9nKFwiaHR0cCByZXF1ZXN0IGZvciBjb252b0xpc3RcIik7XG4gICAgY29uc29sZS5sb2codGhpcy5kZXZpY2VLZXkrXCIgXCIrdGhpcy5hdXRoKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLkFQUF9VUkwgKyAnL3Jlc3Qvd3MvbWVzc2FnZS9saXN0JysnP3N0YXJ0SW5kZXg9MCcrcmVxRGF0YSxvcHRpb25zKVxuICAgIC5tYXAocmVzID0+IDxhbnk+cmVzLmpzb24oKSk7XG4gIH1cblxuICBjaGF0KGRhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1VzZXJJZC1FbmFibGVkJzogdHJ1ZSwnQXBwbGljYXRpb24tS2V5JzogdGhpcy5hcHBJZCwnQWNjZXNzLVRva2VuJzogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdEZXZpY2UtS2V5Jzp0aGlzLmRldmljZUtleSwnQXV0aG9yaXphdGlvbic6ICdCYXNpYyAnK3RoaXMuYXV0aH0pO1xuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVyc30pO1xuICAgIGxldCByZXFEYXRhID0gJyc7XG4gICAgcmVxRGF0YSArPSBcIiZcIiArZGF0YS5pZCArIFwiPVwiICtkYXRhLndob3NlO1xuICAgIGlmKGRhdGEuZW5kVGltZSl7XG4gICAgICByZXFEYXRhICs9ICcmZW5kVGltZT0nK2RhdGEuZW5kVGltZTtcbiAgICB9XG4gICAgcmVxRGF0YSArPSAnJnBhZ2VTaXplPTMwJztcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLkFQUF9VUkwgKyAnL3Jlc3Qvd3MvbWVzc2FnZS9saXN0JysnP3N0YXJ0SW5kZXg9MCcrcmVxRGF0YSxvcHRpb25zKVxuICAgIC5tYXAocmVzID0+IDxhbnk+cmVzLmpzb24oKSk7XG4gIH1cblxuICBzZW5kKGRhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1VzZXJJZC1FbmFibGVkJzogdHJ1ZSwnQXBwbGljYXRpb24tS2V5JzogdGhpcy5hcHBJZCwnQWNjZXNzLVRva2VuJzogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdEZXZpY2UtS2V5Jzp0aGlzLmRldmljZUtleSwnQXV0aG9yaXphdGlvbic6ICdCYXNpYyAnK3RoaXMuYXV0aH0pO1xuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVyc30pOyAgICBcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICB0aGlzLkFQUF9VUkwgKyAnL3Jlc3Qvd3MvbWVzc2FnZS9zZW5kJyxcbiAgICAge1xuICAgICAgICBjb250ZW50VHlwZTowLFxuICAgICAgICAvLyBrZXk6XCJzZDRweVwiLFxuICAgICAgICBtZXNzYWdlOmRhdGEubWVzc2FnZSxcbiAgICAgICAgbWV0YWRhdGE6e30sXG4gICAgICAgIHNvdXJjZTo1LFxuICAgICAgICB0bzpkYXRhLndob3NlLFxuICAgICAgICB0eXBlOjVcbiAgICAgIH0sb3B0aW9uc1xuICAgICkubWFwKHJlcyA9PiA8YW55PnJlcy5qc29uKCkpO1xuICB9XG5cbiAgc3RhcnROZXcoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdVc2VySWQtRW5hYmxlZCc6IHRydWUsJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBwSWQsJ0FjY2Vzcy1Ub2tlbic6IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRGV2aWNlLUtleSc6dGhpcy5kZXZpY2VLZXksJ0F1dGhvcml6YXRpb24nOiAnQmFzaWMgJyt0aGlzLmF1dGh9KTtcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnN9KTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLkFQUF9VUkwgKyAnL3Jlc3Qvd3MvdXNlci9maWx0ZXI/c3RhcnRJbmRleD0wJnBhZ2VTaXplPTMwJm9yZGVyQnk9MScsb3B0aW9ucylcbiAgICAubWFwKHJlcyA9PiA8YW55PnJlcy5qc29uKCkpO1xuICB9XG5cbiAgY3JlYXRlR3JvdXAoZGF0YSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJywnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVXNlcklkLUVuYWJsZWQnOiB0cnVlLCdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwcElkLCdBY2Nlc3MtVG9rZW4nOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb2ZVc2VySWQnOmRhdGEuYWRtaW5JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdEZXZpY2UtS2V5Jzp0aGlzLmRldmljZUtleSwnQXV0aG9yaXphdGlvbic6ICdCYXNpYyAnK3RoaXMuYXV0aH0pO1xuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVyc30pOyAgICBcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICB0aGlzLkFQUF9VUkwgKyAnL3Jlc3Qvd3MvZ3JvdXAvdjIvY3JlYXRlJyxcbiAgICAge1xuICAgICAgICBncm91cE5hbWUgOiBkYXRhLmdyb3VwTmFtZSxcbiAgICAgICAgZ3JvdXBNZW1iZXJMaXN0IDogZGF0YS5tZW1iZXJzLFxuICAgICAgfSxvcHRpb25zXG4gICAgKS5tYXAocmVzID0+IDxhbnk+cmVzLmpzb24oKSk7XG4gIH1cblxuIGRlbGV0ZU1lc3NhZ2UoZGF0YSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJywnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCAna2V5JzogZGF0YS5rZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdVc2VySWQtRW5hYmxlZCc6IHRydWUsJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBwSWQsJ0FjY2Vzcy1Ub2tlbic6IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRGV2aWNlLUtleSc6dGhpcy5kZXZpY2VLZXksJ0F1dGhvcml6YXRpb24nOiAnQmFzaWMgJyt0aGlzLmF1dGh9KTtcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnN9KTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLkFQUF9VUkwgKyAnL3Jlc3Qvd3MvbWVzc2FnZS9kZWxldGUnLG9wdGlvbnMpXG4gICAgLm1hcChyZXMgPT4gPGFueT5yZXMuanNvbigpKTtcbiAgfVxuXG4gIGRlbGV0ZUNvbnZlcnNhdGlvbihkYXRhKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVXNlcklkLUVuYWJsZWQnOiB0cnVlLCdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwcElkLCdBY2Nlc3MtVG9rZW4nOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0RldmljZS1LZXknOnRoaXMuZGV2aWNlS2V5LCdBdXRob3JpemF0aW9uJzogJ0Jhc2ljICcrdGhpcy5hdXRofSk7XG4gICAgbGV0IHJlcURhdGEgPSAnJztcbiAgICByZXFEYXRhICs9IFwiP1wiICtkYXRhLmlkICsgXCI9XCIgK2RhdGEud2hvc2U7XG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzfSk7XG4gICAgY29uc29sZS5sb2codGhpcy5hcHBJZCArXCIgXCIrIFwiIFwiK3RoaXMudG9rZW4rXCIgXCIrdGhpcy5kZXZpY2VLZXkrXCIgXCIrdGhpcy5hdXRoKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLkFQUF9VUkwgKyAnL3Jlc3Qvd3MvbWVzc2FnZS9kZWxldGUvY29udmVyc2F0aW9uJytyZXFEYXRhLG9wdGlvbnMpXG4gICAgLm1hcChyZXMgPT4gcmVzKTtcbiAgfVxuXG4gIGFkZE1lbWJlcihkYXRhKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdVc2VySWQtRW5hYmxlZCc6IHRydWUsJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBwSWQsJ0FjY2Vzcy1Ub2tlbic6IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvZlVzZXJJZCc6ZGF0YS5hZG1pbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0RldmljZS1LZXknOnRoaXMuZGV2aWNlS2V5LCdBdXRob3JpemF0aW9uJzogJ0Jhc2ljICcrdGhpcy5hdXRofSk7XG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzfSk7ICAgIFxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgIHRoaXMuQVBQX1VSTCArICcvcmVzdC93cy9ncm91cC9hZGQvbWVtYmVyJyxcbiAgICAge1xuICAgICAgICB1c2VySWQ6dGhpcy51c2VySWQsXG4gICAgICAgIGNsaWVudEdyb3VwSWQ6ZGF0YS5jbGllbnRHcm91cElkXG4gICAgICB9LG9wdGlvbnNcbiAgICApLm1hcChyZXMgPT4gPGFueT5yZXMuanNvbigpKTtcbiAgfVxuXG4gIHJlbW92ZU1lbWJlcihkYXRhKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdVc2VySWQtRW5hYmxlZCc6IHRydWUsJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBwSWQsJ0FjY2Vzcy1Ub2tlbic6IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvZlVzZXJJZCc6ZGF0YS5hZG1pbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0RldmljZS1LZXknOnRoaXMuZGV2aWNlS2V5LCdBdXRob3JpemF0aW9uJzogJ0Jhc2ljICcrdGhpcy5hdXRofSk7XG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzfSk7ICAgIFxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgIHRoaXMuQVBQX1VSTCArICcvcmVzdC93cy9ncm91cC9yZW1vdmUvbWVtYmVyJyxcbiAgICAge1xuICAgICAgICB1c2VySWQ6dGhpcy51c2VySWQsXG4gICAgICAgIGNsaWVudEdyb3VwSWQ6ZGF0YS5jbGllbnRHcm91cElkXG4gICAgICB9LG9wdGlvbnNcbiAgICApLm1hcChyZXMgPT4gPGFueT5yZXMuanNvbigpKTtcbiAgfVxuXG4gaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgfVxufSJdfQ==