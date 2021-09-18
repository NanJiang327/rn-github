package com.rngithub; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class CalendarModule extends ReactContextBaseJavaModule {
    CalendarModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("DEFAULT_EVENT_NAME", "New Event");
        return constants;
    }

    @ReactMethod
    public void createCalendarEvent(String name, String location, Promise promise) {
        Log.d("CalendarModule", "Create event called with name: " + name
                + " and location: " + location);
//        Integer eventId = 1;
//        callBack.invoke(null, eventId);

//        try {
//            Integer eventId = 2;
//            promise.resolve(eventId);
//        } catch(Exception e) {
//            promise.reject("Create Event Error", e);
//        }
    }
}