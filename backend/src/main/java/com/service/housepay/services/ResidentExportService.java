package com.service.housepay.services;

import com.service.housepay.exceptions.ExportException;
import com.service.housepay.models.Resident;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResidentExportService {

    private static final String[] HEADERS = {
            "Flat No", "Resident Name", "Mobile", "Email", "Sqft",
            "Owner Name", "Owner Mobile", "Owner Email",
            "Additional Payments", "Type"
    };

    private final ResidentService residentService;

    public byte[] exportResidentsToExcel() {
        List<Resident> residents = residentService.getAllResidents();

        try (XSSFWorkbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Residents");

            // Header style
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setBorderBottom(BorderStyle.THIN);

            // Create header row
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < HEADERS.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(HEADERS[i]);
                cell.setCellStyle(headerStyle);
            }

            // Populate data rows
            int rowIdx = 1;
            for (Resident resident : residents) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(resident.getFlatNo());
                row.createCell(1).setCellValue(resident.getResidentName());
                row.createCell(2).setCellValue(resident.getMobile());
                row.createCell(3).setCellValue(resident.getEmail());
                row.createCell(4).setCellValue(resident.getSqft() != null ? resident.getSqft() : 0);
                row.createCell(5).setCellValue(resident.getOwnerName() != null ? resident.getOwnerName() : "");
                row.createCell(6).setCellValue(resident.getOwnerMobile() != null ? resident.getOwnerMobile() : "");
                row.createCell(7).setCellValue(resident.getOwnerEmail() != null ? resident.getOwnerEmail() : "");
                row.createCell(8).setCellValue(resident.getAdditionalPayments() != null ? resident.getAdditionalPayments().doubleValue() : 0);
                row.createCell(9).setCellValue(resident.getType() != null ? resident.getType().name() : "");
            }

            // Auto-size columns
            for (int i = 0; i < HEADERS.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new ExportException("Failed to export residents to Excel", e);
        }
    }
}

