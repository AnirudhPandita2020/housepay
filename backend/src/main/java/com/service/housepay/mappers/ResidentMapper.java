package com.service.housepay.mappers;

import com.service.housepay.dto.ResidentDTO;
import com.service.housepay.enums.ResidentType;
import com.service.housepay.models.Resident;
import org.mapstruct.*;

@Mapper(componentModel = "spring", imports = ResidentType.class)
public interface ResidentMapper {

    @Mapping(target = "ledgers", ignore = true)
    @Mapping(target = "outstandings", ignore = true)
    @Mapping(target = "type", source = "type", defaultExpression = "java(ResidentType.OWNER)")
    Resident toEntity(ResidentDTO dto);

    @Mapping(target = "ledgers", ignore = true)
    @Mapping(target = "outstandings", ignore = true)
    @Mapping(target = "type", source = "type", defaultExpression = "java(ResidentType.OWNER)")
    void updateEntityFromDto(ResidentDTO dto, @MappingTarget Resident resident);
}

