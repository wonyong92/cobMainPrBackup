package com.team23.mainPr.Domain.RentPost.Controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team23.mainPr.Domain.RentPost.Dto.Request.CreateRentPostEntityDto;
import com.team23.mainPr.Domain.RentPost.Dto.Request.UpdateRentPostDto;
import com.team23.mainPr.Domain.RentPost.Dto.Response.PagedRentPostResponseDtos;
import com.team23.mainPr.Domain.RentPost.Dto.Response.RentPostResponseDto;
import com.team23.mainPr.Domain.RentPost.Service.RentPostService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

// 개별 DTO를 body 에 할당하고 공통적인 상태코드(200)으로 응답하므로 RestController 로 변경
@RestController
@RequestMapping("/rentPost")
@RequiredArgsConstructor
public class RentPostController {

	private final RentPostService rentPostService;

	// 스웨거 관련 부분 삭제 진행 - 실제 코드를 읽는데 방해가 많이 된다.
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/post")
	public RentPostResponseDto createRentPost(@RequestBody @Valid CreateRentPostEntityDto dto) {
		return rentPostService.createRentPost(dto);
	}

	/**
	 *
	 *
	 * <pre>
	 * api 설명 작성할때 비슷한 기능은 같은 용어를 사용해야 혼동을 줄이고, 통일감을 줄 수 있다.
	 * </pre>
	 */
	@PutMapping("/update")
	public RentPostResponseDto updateRentPost(
		@RequestBody @Valid UpdateRentPostDto updateRentPostDto, Integer postId) {
		return rentPostService.updateRentPost(postId, updateRentPostDto);
	}

	@DeleteMapping("/delete")
	public String updateRentPost(@RequestParam Integer postId) {
		return rentPostService.deleteRentPost(postId);
	}

	/**
	 *
	 *
	 * <pre>
	 * 조회에 관련된 uri는 PathVariable 사용하기
	 * </pre>
	 */
	// 멱등성이 보장되지 않는 api에 대해서는 put으로 변경 - 요청할 때 마다 조회수가 상승하므로 멱등성이 지켜지지 않는 api
	@PostMapping("/{postId}")
	public RentPostResponseDto getRentPost(@PathVariable Integer postId) {
		return rentPostService.getRentPost(postId);
	}

	@PostMapping("/images")
	public String postImages(
		@RequestParam(value = "image") List<MultipartFile> files, @RequestParam Integer postId)
		throws IOException {
		return rentPostService.postImages(files, postId);
	}

	@GetMapping("/images/get")
	public List<Integer> getImages(@RequestParam Integer postId) {
		return rentPostService.getPostImages(postId);
	}

	@GetMapping(value = "/image/get", produces = "image/png")
	public Resource getImage(@RequestParam Integer imageId) throws IOException {
		return rentPostService.getImage(imageId);
	}

	@GetMapping("/posts")
	public PagedRentPostResponseDtos getRentPosts(
		@PageableDefault(page = 0, size = 20, sort = "writeDate", direction = Sort.Direction.DESC)
		Pageable pageable,
		@RequestParam(defaultValue = "false") Boolean rentStatus,
		@RequestParam(defaultValue = "category") String category) {
		return rentPostService.getRentPosts(pageable, rentStatus, category);
	}

	@PostMapping("/search")
	public List<RentPostResponseDto> search(@RequestParam String phrase) {
		return rentPostService.searchAll(phrase);
	}

	@Operation(
		description =
			"H2의 FULL TEXT SEARCH 기능을 사용한 메소드 입니다. 속도 확인 후 기존의 search 메소드를 대체할수 있다고 판단되면 통합하도록 하겠습니다.")
	@PostMapping("/ftSearch")
	public List<RentPostResponseDto> ftSearch(@RequestParam String phrase) {
		return rentPostService.ftSearchAll(phrase);
	}
}
