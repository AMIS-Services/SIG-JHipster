package nl.amis.sigdemo.service;

import nl.amis.sigdemo.service.dto.CountryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Country.
 */
public interface CountryService {

    /**
     * Save a country.
     *
     * @param countryDTO the entity to save
     * @return the persisted entity
     */
    CountryDTO save(CountryDTO countryDTO);

    /**
     * Get all the countries.
     *
     * @return the list of entities
     */
    List<CountryDTO> findAll();


    /**
     * Get the "id" country.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CountryDTO> findOne(Long id);

    /**
     * Delete the "id" country.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
