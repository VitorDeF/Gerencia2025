package com.gerencia.appGestao.controller;

import com.gerencia.appGestao.model.UserModel;
import com.gerencia.appGestao.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/novoUsuario")
    public UserModel criarUsuario(@RequestBody UserModel user) {
        return userRepository.save(user);
    }

    @GetMapping("/usuarios")
    public List<UserModel> listarUsuarios() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public UserModel buscarPorId(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public UserModel atualizarUsuario(@PathVariable Long id, @RequestBody UserModel user) {
        user.setId(id);
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}