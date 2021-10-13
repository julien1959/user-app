package com.example.userapp.controllers;

import com.example.userapp.entity.User;
import com.example.userapp.exceptions.ResourceNotFoundException;
import com.example.userapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable("id") int id) {
        User reponse = userService.findById(id);
        if (reponse == null) {
            throw new ResourceNotFoundException();
        }
        return reponse;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public int create(@RequestBody User user) {
        return userService.create(user);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable("id") int id, @RequestBody User user) {
        if(userService.findById(id) == null) {
            throw new ResourceNotFoundException();
        } else
            userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") int id) {
        if(userService.findById(id) == null) {
            throw new ResourceNotFoundException();
        } else
            userService.deleteById(id);
    }


}
