package nl.amis.sigdemo.web.rest;

import com.codahale.metrics.annotation.Timed;
import nl.amis.sigdemo.domain.Job;
import nl.amis.sigdemo.repository.JobRepository;
import nl.amis.sigdemo.web.rest.errors.BadRequestAlertException;
import nl.amis.sigdemo.web.rest.util.HeaderUtil;
import nl.amis.sigdemo.web.rest.util.PaginationUtil;
import nl.amis.sigdemo.service.dto.JobDTO;
import nl.amis.sigdemo.service.mapper.JobMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Job.
 */
@RestController
@RequestMapping("/api")
public class JobResource {

    private final Logger log = LoggerFactory.getLogger(JobResource.class);

    private static final String ENTITY_NAME = "job";

    private final JobRepository jobRepository;

    private final JobMapper jobMapper;

    public JobResource(JobRepository jobRepository, JobMapper jobMapper) {
        this.jobRepository = jobRepository;
        this.jobMapper = jobMapper;
    }

    /**
     * POST  /jobs : Create a new job.
     *
     * @param jobDTO the jobDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobDTO, or with status 400 (Bad Request) if the job has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jobs")
    @Timed
    public ResponseEntity<JobDTO> createJob(@RequestBody JobDTO jobDTO) throws URISyntaxException {
        log.debug("REST request to save Job : {}", jobDTO);
        if (jobDTO.getId() != null) {
            throw new BadRequestAlertException("A new job cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Job job = jobMapper.toEntity(jobDTO);
        job = jobRepository.save(job);
        JobDTO result = jobMapper.toDto(job);
        return ResponseEntity.created(new URI("/api/jobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jobs : Updates an existing job.
     *
     * @param jobDTO the jobDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobDTO,
     * or with status 400 (Bad Request) if the jobDTO is not valid,
     * or with status 500 (Internal Server Error) if the jobDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jobs")
    @Timed
    public ResponseEntity<JobDTO> updateJob(@RequestBody JobDTO jobDTO) throws URISyntaxException {
        log.debug("REST request to update Job : {}", jobDTO);
        if (jobDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        Job job = jobMapper.toEntity(jobDTO);
        job = jobRepository.save(job);
        JobDTO result = jobMapper.toDto(job);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jobs : get all the jobs.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of jobs in body
     */
    @GetMapping("/jobs")
    @Timed
    public ResponseEntity<List<JobDTO>> getAllJobs(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Jobs");
        Page<JobDTO> page;
        if (eagerload) {
            page = jobRepository.findAllWithEagerRelationships(pageable).map(jobMapper::toDto);
        } else {
            page = jobRepository.findAll(pageable).map(jobMapper::toDto);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/jobs?eagerload=%b", eagerload));
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /jobs/:id : get the "id" job.
     *
     * @param id the id of the jobDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobDTO, or with status 404 (Not Found)
     */
    @GetMapping("/jobs/{id}")
    @Timed
    public ResponseEntity<JobDTO> getJob(@PathVariable Long id) {
        log.debug("REST request to get Job : {}", id);
        Optional<JobDTO> jobDTO = jobRepository.findOneWithEagerRelationships(id)
            .map(jobMapper::toDto);
        return ResponseUtil.wrapOrNotFound(jobDTO);
    }

    /**
     * DELETE  /jobs/:id : delete the "id" job.
     *
     * @param id the id of the jobDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jobs/{id}")
    @Timed
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        log.debug("REST request to delete Job : {}", id);

        jobRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
