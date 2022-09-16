package com.team23.mainPr;

import org.springframework.beans.factory.annotation.Value;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DefaultTimeZone {
    @Value("{timeZone.location.asia_seoul}")
    String location;

    public DefaultTimeZone(){
        System.out.println("+++++++++ "+this.location);
    }

    public ZoneId getZoneId(){
        return ZoneId.of(this.location);
    }

    public ZonedDateTime getNow(){
        return ZonedDateTime.now(ZoneId.of(this.location));
    }

}
