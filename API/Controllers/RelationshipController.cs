using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos.Commands.RelationshipCommands;
using API.Dtos.ReadDtos;
using API.HttpHelpers;
using API.Services.RelationshipService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RelationshipController : ControllerBase
    {
        private readonly IRelationshipService _relationshipService;
        public RelationshipController(IRelationshipService relationshipService)
        {
            _relationshipService = relationshipService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HttpResponse<RelationshipReadDto>>> GetRelationship(int id) {
            HttpResponse<RelationshipReadDto> response = await _relationshipService.GetRelationship(id);
            
            switch (response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                case ServiceResponse.NotFound: return NotFound(response);
                default: return NotFound(response);
            }
        }

        [HttpGet("getRelationships")]
        public async Task<ActionResult<List<RelationshipReadDto>>> GetRelationships() {
            HttpResponse<List<RelationshipReadDto>> response = await _relationshipService.GetRelationships();

            switch (response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }

        [HttpGet("getApprovedRelationships")]
        public async Task<ActionResult<List<RelationshipReadDto>>> GetApprovedRelationships() {
            HttpResponse<List<RelationshipReadDto>> response = await _relationshipService.GetApprovedRelationships();

            switch (response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }
        
        [HttpGet("GetTotalUnseenInvitations")]
        public async Task<ActionResult<int>> GetTotalUnseenInvitations() {
            HttpResponse<int> response = await _relationshipService.GetTotalUnseenInvitations();

            switch (response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                default: return NotFound(response);
            }
        }

        [HttpPost("createRelationship")]
        public async Task<ActionResult<HttpResponse<RelationshipReadDto>>> CreateRelationship(CreateRelationshipCommand relationshipCommand) {
            HttpResponse<RelationshipReadDto> response = await _relationshipService.CreateRelationship(relationshipCommand);

            switch(response.ResponseType) {
                case ServiceResponse.Created: return Created(nameof(GetRelationship), response.Data.Id);

                // This should be conflict
                case ServiceResponse.Conflict: return Conflict(response);
            }

            return NotFound(response);
        }

        [HttpPut("approve/{id}")]
        public async Task<ActionResult<HttpResponse<RelationshipReadDto>>> ApproveRelationship(int id) {
            HttpResponse<RelationshipReadDto> response = await _relationshipService.ApproveRelationship(id);
            switch (response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                case ServiceResponse.NotFound: return NotFound(response);
                default: return NotFound(response);
            }
        }
        [Authorize()]
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<HttpResponse<RelationshipReadDto>>> DeleteRelationship(int id) {
            HttpResponse<RelationshipReadDto> response = await _relationshipService.DeleteRelationship(id);

            switch(response.ResponseType) {
                case ServiceResponse.Ok: return Ok(response);
                case ServiceResponse.Conflict: return Conflict(response);
                case ServiceResponse.Unauthorized: return Unauthorized(response);
                default: return NotFound(response);
            }
        }
        [Authorize]
        [HttpPost("setRelationshipInvitationSeen")]
        public async Task<ActionResult<HttpResponse<int>>> SetRelationshipInvitationSeen(SetRelationshipInvitationSeenCommand command) {
            try {
                HttpResponse<int> unseenInvitationsCountResponse = await _relationshipService.SetRelationshipInvitationSeen(command);
                
                switch (unseenInvitationsCountResponse.ResponseType) {
                    case ServiceResponse.Ok: return Ok(unseenInvitationsCountResponse);
                    default: return NotFound(unseenInvitationsCountResponse);
                }
            } catch(Exception e) {
                Console.WriteLine(e.ToString());
                throw;
            }
        }
    }
}