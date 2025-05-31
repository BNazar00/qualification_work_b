$check = [char]0x2705  # ✅
$cross = [char]0x274C  # ❌

$urls = @(
    "http://localhost:8080/api/v1/certificate"
)

$width = 50

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            $formattedUrl = "{0,-$width}" -f $url
            Write-Host "$formattedUrl $check  200 OK"
        } else {
            $formattedUrl = "{0,-$width}" -f $url
            Write-Host "$formattedUrl $cross Status $($response.StatusCode)"
        }
    } catch {
        $formattedUrl = "{0,-$width}" -f $url
        if ($_.Exception.Response) {
            $code = $_.Exception.Response.StatusCode.value__
            Write-Host "$formattedUrl $cross Status $code"
        } else {
            Write-Host "$formattedUrl $cross Request failed (no response)"
        }
    }
}
