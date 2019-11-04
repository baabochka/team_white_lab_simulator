package com.white.lab_sim.market.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class User {
    @MongoId
    private ObjectId id;

    private String username;

    private String email;

    private String password;

    private String avatar_url;

    private String name;

    private Boolean isActive;

    private String passwordConfirm;

    private Set<Role> roles;

    private Set<Role> saved_units;

    @Transient
    private AtomicInteger incrementor = new AtomicInteger(0);

    public User() {
        super();
        this.isActive = false;
        //id = (long)(incrementor.incrementAndGet());
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @JsonManagedReference
    private VerificationToken verificationToken;

    public String getAvatar_url() {
        return avatar_url;
    }

    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }

    public Set<Role> getSaved_units() {
        return saved_units;
    }

    public void setSaved_units(Set<Role> saved_units) {
        this.saved_units = saved_units;
    }

    public String getNickname() {
        if (name != null) {
            return name;
        }
        else {
            return username;
        }
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }

    public VerificationToken getVerificationToken() {
        return verificationToken;
    }

    public void setVerificationToken(VerificationToken verificationToken) {
        this.verificationToken = verificationToken;
    }

}
