package nl.amis.sigdemo.service.mapper;

import nl.amis.sigdemo.domain.*;
import nl.amis.sigdemo.service.dto.DepartmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Department and its DTO DepartmentDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {

    @Mapping(source = "location.id", target = "locationId")
    DepartmentDTO toDto(Department department);

    @Mapping(source = "locationId", target = "location")
    @Mapping(target = "employees", ignore = true)
    Department toEntity(DepartmentDTO departmentDTO);

    default Department fromId(Long id) {
        if (id == null) {
            return null;
        }
        Department department = new Department();
        department.setId(id);
        return department;
    }
}
