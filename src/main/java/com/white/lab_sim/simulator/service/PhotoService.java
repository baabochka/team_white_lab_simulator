package com.white.lab_sim.simulator.service;

import java.io.IOException;

import org.bson.*;
import org.bson.types.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.white.lab_sim.simulator.repository.PhotoRepository;
import com.white.lab_sim.simulator.model.*;



@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepo;

    public Photo getPhoto(String id) {
        return photoRepo.findById(id).get();
    }

    public String addPhoto(String title, MultipartFile file) throws IOException {
        Photo photo = new Photo(title);
        photo.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        photo = photoRepo.insert(photo);
        return photo.getId();
    }
}