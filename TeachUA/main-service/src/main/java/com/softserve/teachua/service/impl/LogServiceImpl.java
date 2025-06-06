package com.softserve.teachua.service.impl;

import com.softserve.commons.exception.BadRequestException;
import com.softserve.teachua.exception.CannotDeleteFileException;
import com.softserve.teachua.exception.LogNotFoundException;
import com.softserve.teachua.service.LogService;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LogServiceImpl implements LogService {
    public static final String NOT_EXIST = "Log %s does not exist";
    @Value(value = "${logs.path}")
    private String path;

    @Override
    public List<String> getAllLogs() {
        try (Stream<Path> walk = Files.walk(Paths.get(path))) {
            return walk
                    .filter(Files::isRegularFile)
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .sorted(Comparator.reverseOrder())
                    .toList();
        } catch (IOException e) {
            log.error("Error occurred while walking through log files in directory: {}", path, e);
        }

        return new ArrayList<>();
    }

    @Override
    public List<String> getLogByName(String fileName) {
        Path pathToFile = Paths.get(path, fileName);

        if (!Files.exists(pathToFile)) {
            log.error("Tried to read a file: {}, but it does not exist", fileName);
            throw new LogNotFoundException(String.format(NOT_EXIST, fileName));
        }

        try (Stream<String> lines = Files.lines(pathToFile)) {
            return lines.toList();
        } catch (IOException e) {
            log.error("Error occurred while reading a log file: {}", fileName, e);
        }

        return new ArrayList<>();
    }

    public Resource loadLogAsResource(String fileName) {
        Path pathToFile = Paths.get(path, fileName);

        if (!Files.exists(pathToFile)) {
            log.error("Tried to read a file: {}, but it does not exist", fileName);
            throw new LogNotFoundException(String.format(NOT_EXIST, fileName));
        }

        try {
            return new UrlResource(pathToFile.toUri());
        } catch (MalformedURLException e) {
            log.error("Cannot create a new UrlResource", e);
            throw new BadRequestException();
        }
    }

    @Override
    public void deleteLogByName(String fileName) {
        Path pathToFile = Paths.get(path, fileName);

        if (!Files.exists(pathToFile)) {
            log.info("Tried to delete a file: {}, but it does not exist", fileName);
            throw new LogNotFoundException(String.format(NOT_EXIST, fileName));
        }

        try {
            Files.delete(pathToFile);
        } catch (IOException e) {
            log.error("Error occurred while deleting file: {}", fileName, e);
            throw new CannotDeleteFileException(String.format("Error occurred while deleting a file: %s", fileName));
        }
    }
}
