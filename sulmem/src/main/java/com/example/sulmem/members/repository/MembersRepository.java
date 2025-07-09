package com.example.sulmem.members.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.sulmem.members.entity.MembersEntity;

@Repository
public interface MembersRepository  extends JpaRepository<MembersEntity, String>{

}
