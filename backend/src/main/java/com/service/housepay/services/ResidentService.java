package com.service.housepay.services;

import com.service.housepay.dto.ResidentDTO;
import com.service.housepay.models.Resident;

import java.util.List;

public interface ResidentService {

    Resident addResident(ResidentDTO residentDTO);

    Resident updateResident(String flatNo, ResidentDTO residentDTO);

    Resident getResident(String flatNo);

    List<Resident> getAllResidents();
}

