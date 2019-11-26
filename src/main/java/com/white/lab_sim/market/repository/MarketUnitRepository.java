package com.white.lab_sim.market.repository;


import com.white.lab_sim.market.model.MarketUnit;
import com.white.lab_sim.market.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MarketUnitRepository<T extends MarketUnit> extends MongoRepository<MarketUnit, String> {

    List<T> findBySavedBy(User user);

    List<T> findByCreatedBy(User user);
    void deleteMarketUnitsById(String id);
    T findMarketUnitsById(String id);
    void deleteById(String id);
}
