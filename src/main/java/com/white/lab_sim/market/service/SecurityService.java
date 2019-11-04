package com.white.lab_sim.market.service;

public interface SecurityService {

    String findLoggedInUsername();

    void autoLogin(String email, String password);
}
