package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class FileService {


    //application.properties에 app.upload.dir을 정의하고, 없는 경우에는 default값으로 user.home
    @Value("${app.upload.dir:${user.home}}")
    private String DOMAIN;
    private String uploadPath;

    public Path fileSave(MultipartFile file) {
        uploadPath = DOMAIN + File.separator + "pictures";

        File folder = new File(uploadPath);

        if(!folder.exists()){
            try{
                folder.mkdir();
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String curDate = sdf.format(new Date());
        String ftype = file.getContentType();

        String newFileName = curDate + Long.toString(System.nanoTime());
        if(ftype.equals("image/jpeg") || ftype.equals("image/jpg")){
            newFileName += ".jpg";
        }
        else{
            newFileName += ".png";
        }
        Path copyOfLocation = Paths.get(uploadPath + File.separator + newFileName);

         /*
        uploadPath : 기본 저장 경로
        File.separator :  프로그램이 실행 중인 OS에 해당하는 구분자를 리턴(win : \ mac : / )
        StringUtils.cleanPath : Normalize the path by suppressing sequences like "path/.." and inner simple dots. /나, . 떼어주는 역할
        */
        try {
            Files.copy(file.getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return copyOfLocation;
    }

    /*public FileInfoRes fileUpload(Long idx){
        Image imgInfo = imageRepository.findById(idx).get();
        String filePath = imgInfo.getFilePath();
        String fileType = imgInfo.getContentType();
        return new FileInfoRes(filePath,fileType);

    }*/
}
