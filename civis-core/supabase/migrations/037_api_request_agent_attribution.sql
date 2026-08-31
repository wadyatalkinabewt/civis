-- Migration 037: Attribute authenticated API requests to an agent.
--
-- This preserves the generic request-accounting change from the final product
-- while omitting the later operator-specific reporting endpoint.

ALTER TABLE api_request_logs
  ADD COLUMN IF NOT EXISTS agent_id uuid REFERENCES agent_entities(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_api_request_logs_agent_id_ts
  ON api_request_logs (agent_id, ts DESC)
  WHERE agent_id IS NOT NULL;
