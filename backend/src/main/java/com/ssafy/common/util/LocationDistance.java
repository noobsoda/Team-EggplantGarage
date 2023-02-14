package com.ssafy.common.util;

import com.ssafy.api.response.LiveContent;
import com.ssafy.db.entity.Live;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class LocationDistance {

    public static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {

        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;

        if ("kilometer".equals(unit)) {
            dist = dist * 1.609344;
        } else if("meter".equals(unit)){
            dist = dist * 1609.344;
        }

        return (dist);
    }
    // This function converts decimal degrees to radians
    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    // This function converts radians to decimal degrees
    private static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }

    public static List<LiveContent> distanceSort(List<DistanceModule> moduleList, String distanceSort){
        List<LiveContent> liveContentList = new ArrayList<>();
        if(distanceSort.equals("ASC")){
            Collections.sort(moduleList, new Comparator<DistanceModule>() {
                @Override
                public int compare(DistanceModule o1, DistanceModule o2) {
                    return Double.compare(o1.getDistance(), o2.getDistance());
                }
            });
        }else if(distanceSort.equals("DESC")){
            Collections.sort(moduleList, new Comparator<DistanceModule>() {
                @Override
                public int compare(DistanceModule o1, DistanceModule o2) {
                    return Double.compare(o2.getDistance(), o1.getDistance());
                }
            });

        }//그 외일 때는 그냥 리턴
        for(DistanceModule distanceModule : moduleList){
            liveContentList.add(distanceModule.getLiveContent());
        }


        return liveContentList;
    }
}
