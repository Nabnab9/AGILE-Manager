package com.nabnab.agilem.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.nabnab.agilem.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.UserExtra.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.UserExtra.class.getName() + ".projects", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.UserExtra.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Project.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Project.class.getName() + ".userExtras", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Project.class.getName() + ".sprints", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Sprint.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Sprint.class.getName() + ".taskLists", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.TaskList.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.TaskList.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Task.class.getName() + ".userExtras", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Task.class.getName() + ".durations", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Task.class.getName() + ".tagLists", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Task.class.getName() + ".checkLists", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Duration.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.TagList.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.TagList.class.getName() + ".tags", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.Tag.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.CheckList.class.getName(), jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.CheckList.class.getName() + ".checkItems", jcacheConfiguration);
            cm.createCache(com.nabnab.agilem.domain.CheckItem.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
