package com.example.userapp.services.impl;

import com.example.userapp.entity.User;
import com.example.userapp.repository.UserRepository;
import com.example.userapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        List<User> list = new ArrayList<>();
        this.userRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public User findById(int id) {
        if (userRepository.findById(id).isPresent()) {
            return userRepository.findById(id).get();
        } else
            return null;
    }

    @Override
    public int create(User user) {
        return userRepository.save(user).getId();
    }

    @Override
    public void update(int id, User user) {
        user.setId(id);
        userRepository.save(user);
    }

    @Override
    public void deleteById(int id) {
        userRepository.deleteById(id);
    }


}
