package com.service.housepay.controllers;

import com.service.housepay.dto.ResidentDTO;
import com.service.housepay.models.Resident;
import com.service.housepay.services.ResidentExportService;
import com.service.housepay.services.ResidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/residents")
@RequiredArgsConstructor
public class ResidentController {

    private final ResidentService residentService;
    private final ResidentExportService residentExportService;


    @PostMapping
    public ResponseEntity<Resident> addResident(@Valid @RequestBody ResidentDTO residentDTO) {
        Resident resident = residentService.addResident(residentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(resident);
    }

    @PutMapping("/{flatNo}")
    public ResponseEntity<Resident> updateResident(@PathVariable String flatNo,
                                                   @Valid @RequestBody ResidentDTO residentDTO) {
        Resident resident = residentService.updateResident(flatNo, residentDTO);
        return ResponseEntity.ok(resident);
    }

    @GetMapping("/{flatNo}")
    public ResponseEntity<Resident> getResident(@PathVariable String flatNo) {
        Resident resident = residentService.getResident(flatNo);
        return ResponseEntity.ok(resident);
    }

    @GetMapping
    public ResponseEntity<List<Resident>> getAllResidents() {
        List<Resident> residents = residentService.getAllResidents();
        return ResponseEntity.ok(residents);
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportResidents() {
        byte[] excelBytes = residentExportService.exportResidentsToExcel();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setContentDispositionFormData("attachment", "residents.xlsx");
        headers.setContentLength(excelBytes.length);

        return ResponseEntity.ok().headers(headers).body(excelBytes);
    }
}

