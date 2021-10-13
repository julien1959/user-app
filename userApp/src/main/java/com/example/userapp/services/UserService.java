package com.example.userapp.services;

import com.example.userapp.entity.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findById(int id);

    int create(User user);

    void update(int id, User user);

    void deleteById(int id);
}
