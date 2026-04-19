package com.service.housepay.services.impl;

import com.service.housepay.dto.ResidentDTO;
import com.service.housepay.exceptions.ResidentAlreadyExistsException;
import com.service.housepay.exceptions.ResidentNotFoundException;
import com.service.housepay.models.Resident;
import com.service.housepay.mappers.ResidentMapper;
import com.service.housepay.repositories.ResidentRepository;
import com.service.housepay.services.ResidentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResidentServiceImpl implements ResidentService {

    private final ResidentRepository residentRepository;
    private final ResidentMapper residentMapper;


    @Override
    @Transactional
    public Resident addResident(ResidentDTO dto) {
        if (residentRepository.existsById(dto.getFlatNo())) {
            throw new ResidentAlreadyExistsException("Resident with flat number " + dto.getFlatNo() + " already exists");
        }

        Resident resident = residentMapper.toEntity(dto);
        return residentRepository.save(resident);
    }

    @Override
    @Transactional
    public Resident updateResident(String flatNo, ResidentDTO dto) {
        Resident resident = residentRepository.findById(flatNo)
                .orElseThrow(() -> new ResidentNotFoundException("Resident with flat number " + flatNo + " not found"));

        residentMapper.updateEntityFromDto(dto, resident);
        return residentRepository.save(resident);
    }

    @Override
    @Transactional(readOnly = true)
    public Resident getResident(String flatNo) {
        return residentRepository.findById(flatNo)
                .orElseThrow(() -> new ResidentNotFoundException("Resident with flat number " + flatNo + " not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }
}

