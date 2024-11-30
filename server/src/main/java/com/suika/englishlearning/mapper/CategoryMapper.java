package com.suika.englishlearning.mapper;

import com.suika.englishlearning.model.Category;
import com.suika.englishlearning.model.dto.category.CategoryDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryMapper {
    public CategoryDto toDto(Category categoryEntity) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setName(categoryEntity.getName());
        categoryDto.setDescription(categoryEntity.getDescription());

        return categoryDto;
    }

    public Category toEntity(CategoryDto categoryDto) {
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());

        return category;
    }

    public List<CategoryDto> toDtoList(List<Category> categoryEntityList) {
        return categoryEntityList.stream().map(this::toDto).collect(Collectors.toList());
    }
}
