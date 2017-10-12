"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventHandler = (function () {
    function EventHandler() {
        this.handlers = [];
    }
    EventHandler.prototype.on = function (handler) {
        this.handlers.push(handler);
    };
    EventHandler.prototype.off = function (handler) {
        this.handlers = this.handlers.filter(function (h) { return h !== handler; });
    };
    EventHandler.prototype.trigger = function (data) {
        this.handlers.slice(0).forEach(function (h) { return h(data); });
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
var Message = (function () {
    function Message(mqttMessage) {
        this.payload = mqttMessage.payloadString || '';
        this.bytes = mqttMessage.payloadBytes || null;
        this.topic = mqttMessage.destinationName || '';
        this.qos = mqttMessage.qos || 0;
    }
    return Message;
}());
exports.Message = Message;
var guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};
exports.guid = guid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0E7SUFBQTtRQUNZLGFBQVEsR0FBNEIsRUFBRSxDQUFDO0lBYW5ELENBQUM7SUFYVSx5QkFBRSxHQUFULFVBQVUsT0FBNkI7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLDBCQUFHLEdBQVYsVUFBVyxPQUE2QjtRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLE9BQU8sRUFBYixDQUFhLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sOEJBQU8sR0FBZCxVQUFlLElBQVE7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFQLENBQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBeUJnQixvQ0FBWTtBQXZCN0I7SUFLRSxpQkFBWSxXQUFnQjtRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFZb0MsMEJBQU87QUFWNUMsSUFBSSxJQUFJLEdBQUc7SUFDVDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQzthQUM3QyxRQUFRLENBQUMsRUFBRSxDQUFDO2FBQ1osU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFDRCxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHO1FBQ2hELEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztBQUNwQyxDQUFDLENBQUE7QUFFOEIsb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgSUV2ZW50PFQ+IHtcbiAgICBvbihoYW5kbGVyOiB7IChkYXRhPzogVCk6IHZvaWQgfSkgOiB2b2lkO1xuICAgIG9mZihoYW5kbGVyOiB7IChkYXRhPzogVCk6IHZvaWQgfSkgOiB2b2lkO1xufVxuXG5jbGFzcyBFdmVudEhhbmRsZXI8VD4gaW1wbGVtZW50cyBJRXZlbnQ8VD4ge1xuICAgIHByaXZhdGUgaGFuZGxlcnM6IHsgKGRhdGE/OiBUKTogdm9pZDsgfVtdID0gW107XG5cbiAgICBwdWJsaWMgb24oaGFuZGxlcjogeyAoZGF0YT86IFQpOiB2b2lkIH0pIHtcbiAgICAgICAgdGhpcy5oYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvZmYoaGFuZGxlcjogeyAoZGF0YT86IFQpOiB2b2lkIH0pIHtcbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZmlsdGVyKGggPT4gaCAhPT0gaGFuZGxlcik7XG4gICAgfVxuXG4gICAgcHVibGljIHRyaWdnZXIoZGF0YT86IFQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVycy5zbGljZSgwKS5mb3JFYWNoKGggPT4gaChkYXRhKSk7XG4gICAgfVxufVxuXG5jbGFzcyBNZXNzYWdlIHtcbiAgcHVibGljIHBheWxvYWQ6IHN0cmluZztcbiAgcHVibGljIGJ5dGVzOiBBcnJheUJ1ZmZlcjtcbiAgcHVibGljIHRvcGljOiBzdHJpbmc7XG4gIHB1YmxpYyBxb3M6IG51bWJlcjtcbiAgY29uc3RydWN0b3IobXF0dE1lc3NhZ2U6IGFueSl7XG4gICAgdGhpcy5wYXlsb2FkID0gbXF0dE1lc3NhZ2UucGF5bG9hZFN0cmluZyB8fCAnJztcbiAgICB0aGlzLmJ5dGVzID0gbXF0dE1lc3NhZ2UucGF5bG9hZEJ5dGVzIHx8IG51bGw7XG4gICAgdGhpcy50b3BpYyA9IG1xdHRNZXNzYWdlLmRlc3RpbmF0aW9uTmFtZSB8fCAnJztcbiAgICB0aGlzLnFvcyA9IG1xdHRNZXNzYWdlLnFvcyB8fCAwO1xuICB9XG59XG5cbmxldCBndWlkID0gKCkgPT4ge1xuICBmdW5jdGlvbiBzNCgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgIC50b1N0cmluZygxNilcbiAgICAgIC5zdWJzdHJpbmcoMSk7XG4gIH1cbiAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgK1xuICAgIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG59XG5cbmV4cG9ydCB7IElFdmVudCwgRXZlbnRIYW5kbGVyLCBndWlkLCBNZXNzYWdlIH07XG4iXX0=