package com.team23.mainPr.Member.Mapper;

import com.team23.mainPr.Member.Dto.MemberResponse;
import com.team23.mainPr.Member.Entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    MemberResponse memberToMemberResponse(Member member);
}
