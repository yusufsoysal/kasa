package com.yusufsoysal.kasa.service;

import com.yusufsoysal.kasa.domain.Circle;
import com.yusufsoysal.kasa.domain.User;
import com.yusufsoysal.kasa.repository.CircleRepository;
import com.yusufsoysal.kasa.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CircleService {

    private static final Logger logger = LoggerFactory.getLogger(CircleService.class);

    private CircleRepository circleRepository;

    public CircleService(CircleRepository circleRepository) {
        this.circleRepository = circleRepository;
    }

    public Circle createDefaultCircle(User user){
        return createCircle(user.getFullName(), user);
    }

    public Circle createCircle(String name, User owner){
        Circle newCircle = new Circle();
        newCircle.setName(name);
        newCircle.setOwner(owner);

        circleRepository.save(newCircle);
        logger.debug("Created Information for Circle: {}", newCircle);
        return newCircle;
    }

}
