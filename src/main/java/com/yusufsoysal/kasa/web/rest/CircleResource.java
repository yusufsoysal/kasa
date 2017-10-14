package com.yusufsoysal.kasa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.yusufsoysal.kasa.domain.Circle;

import com.yusufsoysal.kasa.repository.CircleRepository;
import com.yusufsoysal.kasa.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Circle.
 */
@RestController
@RequestMapping("/api")
public class CircleResource {

    private final Logger log = LoggerFactory.getLogger(CircleResource.class);

    private static final String ENTITY_NAME = "circle";

    private final CircleRepository circleRepository;

    public CircleResource(CircleRepository circleRepository) {
        this.circleRepository = circleRepository;
    }

    /**
     * POST  /circles : Create a new circle.
     *
     * @param circle the circle to create
     * @return the ResponseEntity with status 201 (Created) and with body the new circle, or with status 400 (Bad Request) if the circle has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/circles")
    @Timed
    public ResponseEntity<Circle> createCircle(@Valid @RequestBody Circle circle) throws URISyntaxException {
        log.debug("REST request to save Circle : {}", circle);
        if (circle.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new circle cannot already have an ID")).body(null);
        }
        Circle result = circleRepository.save(circle);
        return ResponseEntity.created(new URI("/api/circles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /circles : Updates an existing circle.
     *
     * @param circle the circle to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated circle,
     * or with status 400 (Bad Request) if the circle is not valid,
     * or with status 500 (Internal Server Error) if the circle couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/circles")
    @Timed
    public ResponseEntity<Circle> updateCircle(@Valid @RequestBody Circle circle) throws URISyntaxException {
        log.debug("REST request to update Circle : {}", circle);
        if (circle.getId() == null) {
            return createCircle(circle);
        }
        Circle result = circleRepository.save(circle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, circle.getId().toString()))
            .body(result);
    }

    /**
     * GET  /circles : get all the circles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of circles in body
     */
    @GetMapping("/circles")
    @Timed
    public List<Circle> getAllCircles() {
        log.debug("REST request to get all Circles");
        return circleRepository.findAll();
        }

    /**
     * GET  /circles/:id : get the "id" circle.
     *
     * @param id the id of the circle to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the circle, or with status 404 (Not Found)
     */
    @GetMapping("/circles/{id}")
    @Timed
    public ResponseEntity<Circle> getCircle(@PathVariable Long id) {
        log.debug("REST request to get Circle : {}", id);
        Circle circle = circleRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(circle));
    }

    /**
     * DELETE  /circles/:id : delete the "id" circle.
     *
     * @param id the id of the circle to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/circles/{id}")
    @Timed
    public ResponseEntity<Void> deleteCircle(@PathVariable Long id) {
        log.debug("REST request to delete Circle : {}", id);
        circleRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
